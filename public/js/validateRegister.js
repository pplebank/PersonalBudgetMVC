const constraints = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6
    },
    format: {
      pattern: "^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$",
      flags: "i",
      message: "password must contain at least 1 character and 1 number"
    }
  },
  passwordConfirmation: {
    presence: true,
    equality: {
      attribute: "password",
      message: "The passwords does not match"
    }
  },
  name: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 20
    },
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  },
};

let asyncresult = false;
let emailstaticerrors = false;
let asyncerrors = false;
const form = document.querySelector("form#signUpForm");

const emailInput = form.querySelector("#email");
const emailConstrains = {
  email: {
    checkExists: []
  }
}


form.addEventListener("submit", function (ev) {

  if (!handleFormSubmit(form) || !asyncresult) {
    ev.preventDefault();
  }
});

const inputs = form.querySelectorAll("input");
for (let i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener("change", function (ev) {
    let errors = validate(form, constraints) || {};
    showErrorsForInput(this, errors[this.name]);

  });
}

emailInput.addEventListener("change", function (ev) {
  let obj = this;
  validate.async(form, emailConstrains).then(function () {
    showAsyncErrorsForInput(obj, false);
    asyncresult = true;
  }, function (errors) {
    showAsyncErrorsForInput(obj, errors[obj.name.valueOf()]);
    asyncresult = false;
  })
});

function handleFormSubmit(form) {
  let errors = validate(form, constraints);
  showErrors(form, errors || {});
  if (!errors) {
    return true;
  } else {
    return false;
  }
}

function handleAsyncFormSubmit(form) {
  validate.async(form, emailConstrains).then(function (errors) {
    showAsyncErrors(form, errors || {});
    asyncresult = true;
  }, function (asyncerrors) {
    showAsyncErrors(form, errors || {});
    asyncresult = false;
  })
};

function showErrors(form, errors) {
  _.each(form.querySelectorAll("input[name]"), function (input) {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

function showAsyncErrors(errors) {
  _.each(form.querySelector("input[email]"), function (input) {
    showAsyncErrorsForInput(input, errors && errors[input.name]);
  });
}

function showErrorsForInput(input, errors) {
  let formGroup = closestParent(input.parentNode, "form-group"),
    messages = formGroup.querySelector(".messages");
  resetFormGroup(input, formGroup);
  if (errors || (input.name == 'email' && (errors || asyncerrors))) {
    if (input.name == 'email' && errors) {
      emailstaticerrors = true;
    }
    input.classList.add("border-danger");
    _.each(errors, function (error) {
      addError(messages, error);
    });
  } else {
    input.classList.add("border-success");
  }
}

function showAsyncErrorsForInput(input, error) {
  let formGroup = closestParent(input.parentNode, "form-group"),
    messages = formGroup.querySelector(".async-messages");
  resetAsyncFormGroup(input, formGroup);
  if (error || emailstaticerrors) {
    if (error) {
      asyncerrors = true;
      input.classList.add("border-danger");
      addAsyncError(messages, error);
    }
  } else {
    input.classList.add("border-success");
  }
}

function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

function resetFormGroup(input, formGroup) {
  if (input.name == 'email') {
    emailstaticerrors = false;
  }
  if (input.name != 'email' || (input.name == 'email' && !asyncerrors)) {
    input.classList.remove("border-danger");
  }
  input.classList.remove("border-success");
  _.each(formGroup.querySelectorAll(".text-danger:not(.async-messages > p)"), function (el) {
    el.parentNode.removeChild(el);
  });
}

function resetAsyncFormGroup(input, formGroup) {
  asyncerrors = false;
  if (!emailstaticerrors) {
    input.classList.remove("border-danger");
  }
  input.classList.remove("border-success");
  let message = formGroup.querySelector(".async-messages > .text-danger");
  if (message) {
    message.parentNode.removeChild(message);
  }
}

function addError(messages, error) {
  let block = document.createElement("p");
  block.classList.add("text-danger");
  block.innerText = error;
  messages.appendChild(block);
}

function addAsyncError(messages, error) {
  let block = document.createElement("p");
  block.classList.add("text-danger");
  block.innerText = error
  messages.appendChild(block);
}

validate.validators.checkExists = function () {
  return new validate.Promise(function (resolve, reject) {
    if (!validate.isEmpty(emailInput.value)) {
      fetch('http://localhost/account/validateEmail?email=' + emailInput.value)
        .then(response => response.json())
        .then(data => {
          if (data != false) resolve("already exists!");
          else resolve();
        })
        .catch(function (error) {
          reject(": Error, try again.");
        });
    } else resolve();
  });
};

