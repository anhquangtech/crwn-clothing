import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signIn-signUp/signInsignUp.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    unsubcribeFromAuth = null;
    
    componentDidMount() {
        const { setCurrentUser } = this.props
        this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            userRef.onSnapshot((snapShot) => {
                setCurrentUser({
                    id: snapShot.id,
                    ...snapShot.data()
                })
            })
        }

        setCurrentUser(userAuth); 
      })
    }
    
    componentWillUnmount() {
        this.unsubcribeFromAuth();
    }
    
    render() {        
        return (
            <div>
                <Header />
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/shop' component={ShopPage} />
                  <Route path='/signIn' component={SignInSignUpPage} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
