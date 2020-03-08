import React from 'react';
import './signUp.styles.scss';

import FormInput from '../form-input/formInput.component';
import CustomButton from '../custom-button/customButton.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email, 
                password
            );
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '' 
            });
        } catch (error) {
            console.log('Error register account', error.message);
        }
        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }
    
    render() {
        const { displayName, email, password, confirmPassword} = this.state;

        return (
            <div className="sign-up">
                <h2>I do not have account</h2>
                <span>Sign up with email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                      name="displayName"
                      type="text"
                      value={displayName}
                      handleChange={this.handleChange}
                      label="Name"
                      required
                    />

                    <FormInput 
                      name="email"
                      type="email"
                      value={email}
                      handleChange={this.handleChange}
                      label="Email"
                      required
                    />
                     
                    <FormInput 
                      name="password"
                      type="password"
                      value={password}
                      handleChange={this.handleChange}
                      label="Password"
                      required
                    />

                    <FormInput 
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      handleChange={this.handleChange}
                      label="Confirm Password"
                      required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;