import React from 'react';
import {connect} from 'react-redux';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import CartIcon from '../cart-icon/cartIcon.component';
import Cart from '../cart-dropdown/cartDropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-container" to='/'>
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to='./shop'>
                SHOP
            </Link>
            <Link className="option" to='./contact'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className="option" onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className="option" to='./signIn'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : (
        <Cart />

        )}
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);