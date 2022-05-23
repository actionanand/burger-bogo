import React, { Component } from 'react';

import { Route, Routes } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  constructor() {
    super();
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query)
    const ingredients = {};

    for(let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }

    // console.log(ingredients);

    this.setState({ingredients});

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
            <Route path='contact-data' element={<ContactData />} />
          </Routes>
      </div>
    );
  }
}

export default withRouter(Checkout);