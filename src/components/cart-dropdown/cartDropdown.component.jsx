import React from 'react'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/customButton.component'
import './cartDropdown.styles.scss'
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors'
const Cart = ({ cartItems }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{cartItems.map((cartItem) => (
				<CartItem key={cartItems.id} item={cartItem} />
			))}
		</div>
		<CustomButton>GO TO CHECKOUT</CustomButton>
	</div>
)

const mapStateToProps = (state) => ({
	cartItems: selectCartItems(state),
})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
