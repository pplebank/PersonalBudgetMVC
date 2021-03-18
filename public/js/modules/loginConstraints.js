const nonAsyncConstraints = {
    emailLogin: {
        presence: true
    },
    passwordLogin: {
        presence: true
    }
};

const form = document.querySelector("form#loginForm");
const pathAPI = 'http://localhost/account/validateEmail?email=';
const asyncInput = document.querySelector("#emailLogin");

const emailConstrains = {
    emailLogin: {
        checkExists: [true, 'didin\'t found in database']
    }
};

export {
    nonAsyncConstraints,
    emailConstrains,
    asyncInput,
    pathAPI,
    form
};