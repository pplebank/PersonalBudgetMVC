class ValidateInputs {
  constructor(form = '', asyncInput = '', notAsyncCheck, asyncCheck, nonAsyncConstraints = {}, asyncConstrains = {}) {
    this.nonAsyncResult;
    this.asyncResult = !asyncCheck;
    this.nonAsyncInputErrors = false;
    this.asyncInputErrors = false;
    this.form = form;
    this.asyncInput = asyncInput;
    this.notAsyncCheck = notAsyncCheck;
    this.asyncCheck = asyncCheck;
    this.nonAsyncConstraints = nonAsyncConstraints;
    this.asyncConstrains = asyncConstrains;

    this.nonAsyncInputs = this.form.querySelectorAll(".nonasync > input");
    this.asyncInputs = this.form.querySelectorAll(".async > input");

    this.addNonAsyncValidation();
    this.addAsyncValidation();
    this.addSubmitListener();

  }

  addSubmitListener() {
    this.form.addEventListener("submit", (ev) => {
      if (this.notAsyncCheck) {
        this.nonAsyncResult = this.handleFormSubmit();
      } else {
        this.nonAsyncResult = true;
      }
      if (!this.nonAsyncResult || !this.asyncResult) {
        ev.preventDefault();
      }
    })
  }

  addNonAsyncValidation() {
    _.each(this.nonAsyncInputs, (input) => {
      input.addEventListener("change", (ev) => {
        let errors = validate(this.form, this.nonAsyncConstraints) || {};
        this.showErrorsForInput(input, errors[input.name]);
      })
    })
  }

  addAsyncValidation() {
    _.each(this.asyncInputs, (input) => {
      let obj = input;
      input.addEventListener("change", (ev) => {
        let asyncData = ['{' + '\"' + input.name + '\"' + ':' + ' ' + '\"' + input.value + '\"' + "}"];
        let asyncDataJSON = JSON.parse(asyncData);
        validate.async(asyncDataJSON, this.asyncConstrains).then(() => {
          this.showAsyncErrorsForInput(obj, false);
          this.asyncResult = true;
        }, (errors) => {
          this.showAsyncErrorsForInput(obj, errors[obj.name.valueOf()]);
          this.asyncResult = false;
        })
      });
    });
  }

  handleFormSubmit() {
    let errors = validate(this.form, this.nonAsyncConstraints);
    console.log(errors);
    this.showErrors(errors || {});
    if (!errors) {
      return true;
    } else {
      return false;
    }
  }

  showErrors(errors) {
    _.each(this.nonAsyncInputs, (input) => {

      this.showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  showErrorsForInput(input, errors) {
    let formGroup = this.closestParent(input.parentNode, "form-group");
    let messages = formGroup.querySelector(".messages");
    this.resetFormGroup(input, formGroup);

    if (errors || (input.name == this.asyncInput.name && (errors || this.asyncInputErrors))) {

      if (input.name == this.asyncInput.name && errors) {
        this.nonAsyncInputErrors = true;
      }
      input.classList.add("border-danger");
      _.each(errors, (error) => {
        this.addError(messages, error);
      });
    } else {
      input.classList.add("border-success");
    }
  }

  closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  resetFormGroup(input, formGroup) {
    _.each(this.asyncInputs, (asyncInput) => {
      if (input.name == asyncInput) {
        this.nonAsyncInputErrors = false;
      }
      if (input.name != asyncInput || (input.name == asyncInput && !asyncInputErrors)) {
        input.classList.remove("border-danger");
      }
      input.classList.remove("border-success");
      _.each(formGroup.querySelectorAll(".text-danger:not(.async-messages > p)"), (el) => {
        el.parentNode.removeChild(el);
      });
    });
  };

  addError(messages, error) {
    let block = document.createElement("p");
    block.classList.add("text-danger");
    block.innerText = error;
    messages.appendChild(block);
  }

  showAsyncErrorsForInput(input, error) {
    let formGroup = this.closestParent(input.parentNode, "form-group");
    let messages = formGroup.querySelector(".async-messages");
    this.resetAsyncFormGroup(input, formGroup);
    if (error || this.nonAsyncInputErrors) {
      if (error) {
        this.asyncInputErrors = true;
        input.classList.add("border-danger");
        this.addAsyncError(messages, error);
      }
    } else {
      input.classList.add("border-success");
    }
  }

  resetAsyncFormGroup(input, formGroup) {
    this.asyncInputErrors = false;
    if (!this.nonAsyncInputErrors) {
      input.classList.remove("border-danger");
    }
    input.classList.remove("border-success");
    let message = formGroup.querySelector(".async-messages > .text-danger");
    if (message) {
      message.parentNode.removeChild(message);
    }
  }

  addAsyncError(messages, error) {
    let block = document.createElement("p");
    block.classList.add("text-danger");
    block.innerText = error;
    messages.appendChild(block);
  }

}

validate.validators.checkExists = (input, parameters) => {
  return new validate.Promise((resolve, reject) => {
    if (!validate.isEmpty(input)) {
      fetch(pathAPI + input)
        .then(response => response.json())
        .then(data => {
          if (data != parameters[0]) resolve(parameters[1]);
          else resolve();
        })
        .catch((error) => {
          reject("Error, try again.");
        });
    } else resolve();
  });
};

const pathAPI = 'http://localhost/account/validateEmail?email=';
export {
  ValidateInputs
};