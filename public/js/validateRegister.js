(function () {
    var constraints = {
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
})();