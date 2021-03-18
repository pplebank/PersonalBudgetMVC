const nonAsyncConstraints = {
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

const form = document.querySelector("form#signUpForm");
const pathAPI = 'http://localhost/account/validateEmail?email=';
const asyncInput = document.querySelector("#email");

const emailConstrains = {
    email: {
        checkExists: [false, 'already exists!']
    }
};

export {
    emailConstrains,
    asyncInput,
    pathAPI,
    form,
    nonAsyncConstraints
};