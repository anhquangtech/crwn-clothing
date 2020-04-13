import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectorCurrentUser } from '../../redux/user/user.selectors'
import Cart from '../cart-dropdown/cartDropdown.component'
import CartIcon from '../cart-icon/cartIcon.component'
import './header.styles.scss'

const Header = ({ currentUser, hidden }) => (
	<div className='header'>
		<Link className='logo-container' to='/'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link className='option' to='./shop'>
				SHOP
			</Link>
			<Link className='option' to='./contact'>
				CONTACT
			</Link>
			{currentUser ? (
				<div className='option' onClick={() => auth.signOut()}>
					SIGN OUT
				</div>
			) : (
				<Link className='option' to='./signIn'>
					SIGN IN
				</Link>
			)}
			<CartIcon />
		</div>
		{hidden ? null : <Cart />}
	</div>
)

const mapStateToProps = createStructuredSelector({
	currentUser: selectorCurrentUser,
	hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)
