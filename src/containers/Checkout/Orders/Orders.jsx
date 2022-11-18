import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render () {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = (
        this.props.orders.map(order => {
          return (<Order 
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />)
        })
      );
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));