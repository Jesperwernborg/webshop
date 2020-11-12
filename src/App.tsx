import React, { useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Default from './components/Default';
import ProductList from './components/productList/ProductList';
import Details from './components/details/Details';
import Cart from './components/cart/Cart';
import Axios from 'axios';
import {ICart} from './components/interfaces/Interfaces';
import {IProduct} from './components/interfaces/Interfaces';
import Admin from './components/admin/Admin';
import Home from './components/home/home'

function App() {
//States
const [products, setProducts] = useState<IProduct[]>([]);
const [cart, setCart] = useState<ICart[]>([]);
const [total, setTotal] = useState<any>([]);
const [sum, setSum] = useState<any>(0);

//Movies/Products API 
   useEffect(() => {
      async function getProducts() {
          let result = await Axios.get<IProduct[]>('http://medieinstitutet-wie-products.azurewebsites.net/api/products');

          setProducts(result.data)
      }
     getProducts();
 }, [])  

 //Add Product to cart
 function add(product: IProduct) {
  let sum = 0;
  let find = cart.find(x => product.id === x.movie.id)
  let myProduct: ICart = {movie: product};
  if(find === undefined) {
    setCart([...cart, myProduct]);
    setTotal([...total, product.price])
    for (let number of total){
      sum = sum + number;
      setSum(sum);
    }  
  } 
}

  return (
    <Router>
      <Navbar sum={sum} cart={cart}></Navbar>
      <Switch>
        
        <Route path="/Admin"><Admin></Admin></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart"><Cart sum={sum}/* addQuantity={addQuantity} */ add={add} cart={cart}></Cart></Route>
        <Route path="/products"><ProductList products={products} add={add}/></Route>
       <Route exact={true} path="/" component={Home}></Route>
        <Route path="*" component={Default}></Route>
        
      </Switch> 
 
    </Router>
  );
}

export default App;