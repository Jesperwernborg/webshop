import React from 'react';
import { IProduct } from '../interfaces/Interfaces';
import './ProductList.scss';

export default function Movies(props: { products: IProduct[]; add: (arg0: any) => void; } ) {

    let productsHtml = props.products.map((product: IProduct) => {
    return (<div className="moviesLayout" key={product.id}>
    <img src={product.imageUrl} alt=""/>
    <h2>{product.name}</h2>
    <p>{product.price}:-</p>
    <button className="buyBtn" onClick={() => props.add(product)}>ADD</button>
    </div>)
    })

    return(
        <React.Fragment>
            <h3>Products</h3>
            <div className="margin-top">
            {productsHtml}
            </div>
        </React.Fragment>
    )
}
