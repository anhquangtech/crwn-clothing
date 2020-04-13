import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import './App.css'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import CheckoutPage from './pages/checkout/checkout.component'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInSignUpPage from './pages/signIn-signUp/signInsignUp.component'
import { setCurrentUser } from './redux/user/user.actions'
import { selectorCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {
	unsubcribeFromAuth = null

	componentDidMount() {
		const { setCurrentUser } = this.props
		this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					})
				})
			}

			setCurrentUser(userAuth)
		})
	}

	componentWillUnmount() {
		this.unsubcribeFromAuth()
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route
						exact
						path='/signIn'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		)
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectorCurrentUser,
})
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
