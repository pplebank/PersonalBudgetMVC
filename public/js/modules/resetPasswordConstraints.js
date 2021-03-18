const nonAsyncConstraints = {
    emailReset: {
        presence: true,
        email: true
    }
};

const form = document.querySelector("form#passwordForgotForm");
const pathAPI = 'http://localhost/account/validateEmail?email=';
const asyncInput = document.querySelector("#emailReset");

const emailConstrains = {
    emailReset: {
        checkExists: [true, 'didin\'t found in database']
    }
};

export {
    emailConstrains,
    asyncInput,
    pathAPI,
    form,
    nonAsyncConstraints
};