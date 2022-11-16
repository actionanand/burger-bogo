import React, { Component } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  constructor() {
    super();
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
  }

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   // console.log(query)
  //   const ingredients = {};
  //   let price = 0;

  //   for(let param of query.entries()) {
  //     if(param[0] === 'price') {
  //       price = +param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1]; // ['salad', '2'];
  //     }
  //   }

  //   // console.log(ingredients);

  //   this.setState({ingredients, price});

  // }

  checkoutCancelledHandler() {
    this.props.navigate('/');
  }

  checkoutContinuedHandler = () => {
    this.props.navigate('contact-data');
  }

  render() {
    let summary = <Navigate to="/" />;

    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />

          <Routes>
            <Route path='contact-data' 
              element={<ContactData />} />
          </Routes>
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));