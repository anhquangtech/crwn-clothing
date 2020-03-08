import React from 'react';
import './signInsignUp.styles.scss';

import SignIn from '../../components/sign-in/signIn.component';
import SignUp from '../../components/sign-up/signUp.component';

const signInSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>
)

export default signInSignUpPage;