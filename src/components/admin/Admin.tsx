import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {IOrder} from '../interfaces/Interfaces';
import './Admin.scss';

export default function Admin() {

const [adminOrders, setAdminOrders] = useState([]);
    
//Gets api orders 
useEffect(() => {
    async function getOrders() {
        let result = await Axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=4523')

        setAdminOrders(result.data)
    }
    getOrders();
}, [])   

let adminHtml = adminOrders.map((order: IOrder) => {
    return (
        <tr className="each-Order" key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdBy}</td>
                  <td>{order.created}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.paymentMethod}</td>
        </tr>
    )}) 

    return(
        <React.Fragment>
            <div id="orders-layout">
            <h3>ADMIN</h3>
            <table id="orders">
            <thead>
                <tr className="table-header">
                  <th className="order-id">CustomerId</th>
                  <th className="order-name">Customer name</th>
                  <th className="order-date">Date</th>
                  <th className="order-price">Total price</th>
                  <th className="order-price">Payment</th>
                </tr>
                {adminHtml}
                </thead>
            </table>
            </div>
        </React.Fragment>
    )
};