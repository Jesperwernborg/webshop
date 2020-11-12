import React, { ChangeEvent, useState} from 'react';
import Axios from 'axios';
import { ICart } from '../interfaces/Interfaces';
import {IUserform} from '../interfaces/Interfaces';

import './Cart.scss'

export default function Cart(props: { cart: ICart[];  add: (arg0: any) => void; sum: number[]; }) {

    let sum = props.sum;

    const defaultValueForm: IUserform = {firstname: '', lastname: '', mastercard: ''}
 
    const [userForm, setUserForm] = useState(defaultValueForm);

    function updateUserForm(e: ChangeEvent<HTMLInputElement>) {
      let name = e.target.name;
      let value = e.target.value;
      setUserForm({...userForm, [name]: value});
    }
    
    //Post order
    function handleSubmit(e:any) {
      e.preventDefault();
    
      Axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=4523',{companyId: 4523, createdBy: userForm.firstname + " " +  userForm.lastname, totalPrice: sum, created: new Date(), paymentMethod: userForm.mastercard })
    .then(res => {
      console.log(res.data);
    })
    
    }

    let cartHtml = props.cart.map((carts: ICart) => {
        return (<div className="moviesLayout" key={carts.movie.id}>
        <img src={carts.movie.imageUrl} alt=""/>
        <h2>{carts.movie.name}</h2>
        <p>{carts.movie.price}:-</p>
        </div>)
    })

    function orderDone() {
        alert('Thanks for your order!')
    }

    return(
        <React.Fragment>
        <h3>Cart</h3>
        <div className="products">
        <div>{cartHtml}</div>
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="firstname">Förnamn</label>
                <input type="text" id="firstname" name="firstname"  value={userForm.firstname} onChange={updateUserForm} />
            <label htmlFor="lastname">Efternamn</label>
                <input type="text" id="lastname" name="lastname"  value={userForm.lastname} onChange={updateUserForm} />
            <label htmlFor="mastercard">MasterCard</label>
                <input type="checkbox"  id="mastercard" name="mastercard" value={userForm.mastercard} onChange={updateUserForm}/>
            <button type="submit" onClick={() => orderDone()}>Send Order</button>
        </form>
        </div>
        </React.Fragment>
    )
}