import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signIn-signUp/signInsignUp.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    unsubcribeFromAuth = null;

    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: null
        }
    }
    
    componentDidMount() {
      this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            userRef.onSnapshot((snapShot) => {
                this.setState({
                    currentUser: {
                        id: snapShot.id,
                        ...snapShot.data()
                    }
                })
                console.log(this.state);
            })
        }

        this.setState({
            currentUser: userAuth
        })
      })
    }
    
    componentWillUnmount() {
        this.unsubcribeFromAuth();
    }
    
    render() {
        const {currentUser} = this.state;
        
        return (
            <div>
                <Header currentUser={currentUser} />
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/shop' component={ShopPage} />
                  <Route path='/signIn' component={SignInSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
