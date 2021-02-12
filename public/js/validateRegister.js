
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

const emailInput = document.querySelector("#email");
const emailConstrains = {
  email: {
    checkExists: []
  }
} 

const form = document.querySelector("form#signUpForm");
form.addEventListener("submit", function(ev) {
  ev.preventDefault();
  handleFormSubmit(form);
});

const inputs = document.querySelectorAll("input");
for (let i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener("change", function(ev) {
    let obj = this;
    let n = this.name;

    validate.async(form, emailConstrains).then(function() {
      let moreErrors = validate(form, constraints) || {};
      showErrorsForInput(obj, moreErrors[n.valueOf()]);
    }, function(errors) {
        showErrorsForInput(obj, errors[n.valueOf()]);
    });
  });
}

function handleFormSubmit(form) {
  validate.async(form, emailConstrains).then(function() {
    let errors = validate(form, constraints);
    showErrors(form, errors || {});
  }, function(errors) {
    showErrors(form, errors || {});
    if (!errors) {
      console.log('xddd');
    }
  });
}

function showErrors(form, errors) {
  _.each(form.querySelectorAll("input[name]"), function (input) {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

function showErrorsForInput(input, errors) {
  var formGroup = closestParent(input.parentNode, "form-group"),
    messages = formGroup.querySelector(".messages");
  resetFormGroup(input, formGroup);
  if (errors) {
    input.classList.add("border-danger");
    _.each(errors, function (error) {
      addError(messages, error);
    });
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
  input.classList.remove("border-danger");
  input.classList.remove("border-success");
  _.each(formGroup.querySelectorAll(".text-danger"), function (el) {
    el.parentNode.removeChild(el);
  });
}

function addError(messages, error) {
  let block = document.createElement("p");
  block.classList.add("text-danger");
  block.innerText = error;
  messages.appendChild(block);
}

validate.validators.checkExists = function () {
  return new validate.Promise(function (resolve, reject) {
    if (!validate.isEmpty(emailInput.value)) {
      fetch('account/validateEmail?email=' + emailInput.value)
        .then(response => response.json())
  .then(data => {

    if (data != false) resolve("already exists!");
    else resolve();
  })
  .catch(function(error) {
    reject(": Error, try again.");
  });
} else resolve();
});
};


