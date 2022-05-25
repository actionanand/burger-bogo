import React, { Component } from 'react';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(resp => {
        const fetchedArray = [];
        for(let key in resp.data) {
          fetchedArray.push({
            ...resp.data[key],
            id: key
          });
        }

        this.setState({loading: false, orders: fetchedArray});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render () {
    return (
      <div>
        {this.state.orders.map(order => {
          return (<Order 
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />)
        })}
      </div>
    );
  }
}

export default withErrorhandler(Orders, axios);