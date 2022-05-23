import React, { Component } from 'react';

import { Route, Routes } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {
      'salad': 0,
      'meat': 0,
      'cheese': 0,
      'bacon': 0
    },
    price: 0
  };

  constructor() {
    super();
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    // console.log(query)
    const ingredients = {};
    let price = 0;

    for(let param of query.entries()) {
      if(param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1]; // ['salad', '2'];
      }
    }

    // console.log(ingredients);

    this.setState({ingredients, price});

  }

  checkoutCancelledHandler() {
    this.props.navigate('/');
  }

  checkoutContinuedHandler = () => {
    this.props.navigate('contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />

          <Routes>
            <Route path='contact-data' 
              element={<ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props} />} />
          </Routes>
      </div>
    );
  }
}

export default withRouter(Checkout);