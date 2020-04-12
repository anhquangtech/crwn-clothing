import React from 'react'
import './cartIcon.styles.scss'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { toogleCartHidden } from '../../redux/cart/cart.actions'

const CartIcon = ({ toogleCartHidden }) => (
	<div className='cart-icon' onClick={toogleCartHidden}>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>0</span>
	</div>
)

const mapDipatchToProps = (dispatch) => ({
	toogleCartHidden: () => dispatch(toogleCartHidden()),
})

export default connect(null, mapDipatchToProps)(CartIcon)
