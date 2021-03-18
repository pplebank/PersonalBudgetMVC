import * as signUp from './modules/signUpConstraints.js';
import * as resetPassword from './modules/resetPasswordConstraints.js';
import * as login from './modules/loginConstraints.js';

import {
    ValidateInputs
} from './modules/validateInputs.js';

window.onload = () => {

    let signUpForm = new ValidateInputs(signUp.form, signUp.asyncInput, true, true, signUp.nonAsyncConstraints, signUp.emailConstrains);

    let passwordForm = new ValidateInputs(resetPassword.form, resetPassword.asyncInput, true, true, resetPassword.nonAsyncConstraints, resetPassword.emailConstrains);

    let loginForm = new ValidateInputs(login.form, login.asyncInput, true, true, login.nonAsyncConstraints, login.emailConstrains);
}