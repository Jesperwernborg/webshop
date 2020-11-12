
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'
import {ICart} from '../interfaces/Interfaces'

export default function Navbar(props: { cart: ICart[]; sum: number}) {

    return (
        <React.Fragment>
        <nav className="sticky">
            <Link style={{ textDecoration: 'none' }} to="/">
                <h2 className="navbar-logo" >Home</h2>
            </Link>
            <div className="navbar-info">
            <Link style={{ textDecoration: 'none'}} to="/products">
                <p className="each-info">Products</p>
            </Link>
            
            <Link style={{ textDecoration: 'none' }} to="/cart">
                <button className="navbar-cartbtn">Cart {props.cart.length}<br></br>Total: {props.sum}:-</button>
            </Link>
            </div>
        </nav>
        </React.Fragment>
    )
}