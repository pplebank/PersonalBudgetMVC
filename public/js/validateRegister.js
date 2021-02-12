
var enteredEmail = document.querySelector("#email").value

validate.validators.checkExists = function(options) {
    return new validate.Promise(function(resolve, reject) {
      if (enteredEmail != '') {
        response = fetch('account/validateEmail?email='+enteredEmail)
        .then (function(response){
            if (response != options) {
                reject("already exists!")
            } else {
                resolve();}
        })
        }
    })
};

var constraints = {
    email: {
        presence: true,
        email: true,
        checkExists: [false]
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

var form = document.querySelector(".modal-body");
form.addEventListener("submit", function (ev) {
    if (!handleFormSubmit(form)) {
        ev.preventDefault();
    }
});

var inputs = document.querySelectorAll("input")
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function () {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
    });
}


function handleFormSubmit(form) {
    var errors = validate(form, constraints);
    showErrors(form, errors || {});
    if (!errors) {
        return true;
    } else {
        return false;
    }
}

function showErrors(form, errors) {
    _.each(form.querySelectorAll("input[name], select[name]"), function (input) {
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
    var block = document.createElement("p");
    block.classList.add("text-danger");
    block.innerText = error;
    messages.appendChild(block);
}



/*
validate.validators.checkExists = function(input, options) {
    return new validate.Promise(function(resolve, reject) {
      if (!validate.isEmpty(input.value)) {
        axios.get('/data-management/verify-data', {
            params: {
              id: input.value,
              filter: options[0]
            }
          })
          .then(function(response) {
            if (response.data !== options[1]) resolve("already exists!");
            else resolve();
          })
          .catch(function(error) {
            reject(": Error, try again.");
          });
      } else resolve();
    });
  };

  // These are the constraints used to validate the form
  var constraints = {
    email: {
      presence: true,
      email: true
    },
    password: {
      presence: true,
      format: {
        pattern: "^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$",
        flags: "i",
        message: "Must contain at least 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Character"
      },
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    },
    "confirm-password": {
      presence: true,
      equality: {
        attribute: "password",
        message: "^The passwords does not match"
      }
    },
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    },
    district: {
      presence: {
        message: "must be selected"
      }
    }
  };

  var idConstraints = {
    id: {
      presence: true,
      length: {
        minimum: 5,
        tokenizer: function(input) {
          try {
            return input.value;
          } catch (e) {
            return " ";
          }
        }
      },
      checkExists: ["signup", false]
    }
  };

  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form#signup");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  var inputs = document.querySelectorAll("input, textarea, select");
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
      var obj = this;
      var n = this.name;

      validate.async(form, idConstraints).then(function() {
        var moreErrors = validate(form, constraints) || {};
        showErrorsForInput(obj, moreErrors[n.valueOf()]);
      }, function(errors) {
          showErrorsForInput(obj, errors[n.valueOf()]);
      });
    });
  }

  function handleFormSubmit(form) {
    validate.async(form, idConstraints).then(function() {
      var errors = validate(form, constraints);
      showErrors(form, errors || {});
    }, function(errors) {
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    });
  }

  */