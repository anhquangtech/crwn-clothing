import React from 'react';
import './cartDropdown.styles.scss';
import CustomButton from '../custom-button/customButton.component';

const Cart = () => (
    <div className="cart-dropdown">
        <div className="cart-items" />
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

export default Cart;