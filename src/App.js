import React, { Component } from 'react';
import './App.css';
import Products from '../src/components/Products'
import Filter from '../src/components/Filter'
import Basket from '../src/components/Basket'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      products:[],
      filteredProducts:[],
      cartItems:[]
     }
    this.hanndleChangeSort = this.hanndleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCard = this.handleAddToCard.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentWillMount(){
    fetch('http://localhost:8000/products')
    .then(res => res.json())
    .then(data => this.setState({
      products: data,
      filteredProducts: data
    }));
    if(localStorage.getItem('cartItems')){
      this.setState({cartItems: JSON.parse})
    }
  }
 
  hanndleChangeSort(e){
    this.setState({size: e.target.value});
    this.ListProducts();
  }
   handleChangeSize(e){
    this.setState({sort: e.target.value});
    this.ListProducts();
  }
  ListProducts(){
    this.setState(state =>{
      if(state.sort !== ''){
        state.products.sort((a,b) =>(state.sort==='lowest')? (a.price>b.price?1:-1):(a.price<b.price?1:-1))
      }else{
        state.products.sort((a,b)=>(a.id<b.id?1:-1));
      }
      if(state.size !== ''){
        return{ filteredProducts: state.products.filter(a=>
          a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )}
      }
      return {filteredProducts: state.products};
    })
  }
  handleAddToCard(e, product){
    this.setState(state=>{
      const cartItems = state.cartItems;
      let productAllreadyInCart = false;
      cartItems.forEach(item =>{
        if(item.id === product.id){
          productAllreadyInCart = true;
          item.count++;
        }
      })
      if(!productAllreadyInCart){
        cartItems.push({...product, count: 1})
      }
      localStorage.setItem("cartItems ",JSON.stringify(cartItems));
      return cartItems;
    })
  }
  handleRemoveFromCart(e, item){
    this.setState(state=>{
      const cartItems = state.cartItems.filter(elem => elem.id !== item.id)
      localStorage.setItem('cartItems', cartItems);
      return {cartItems};
    })
  }

  render(){
    return (
      <div className="container">
        <h1>Ecomerce shoping cart Application</h1>
        <hr/>
          <div className="row">
            <div className="col-md-8">
              <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize}
              hanndleChangeSort={this.hanndleChangeSort} count={this.state.filteredProducts.length} />
              <hr />
              <Products products={this.state.filteredProducts} handleAddToCard={this.handleAddToCard} />
            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}/>
            </div>
          </div>
      </div>
    );
  }
  
}

export default App;
