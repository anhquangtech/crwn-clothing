import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/customButton.component'
import './cartDropdown.styles.scss'
import { toogleCartHidden } from '../../redux/cart/cart.actions'

const Cart = ({ cartItems, history, toggle }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{cartItems.length ? (
				cartItems.map((cartItem) => (
					<CartItem key={cartItems.id} item={cartItem} />
				))
			) : (
				<span className='empty-message'>Your cart is empty</span>
			)}
		</div>
		<CustomButton
			onClick={() => {
				history.push('/checkout')
				toggle()
			}}
		>
			GO TO CHECKOUT
		</CustomButton>
	</div>
)

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
})

const mapDispatchToProps = (dispatch) => ({
	toggle: () => dispatch(toogleCartHidden()),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
