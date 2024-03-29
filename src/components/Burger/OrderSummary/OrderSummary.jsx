import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  // componentDidUpdate() {
  //   console.log('[OrderSummary] did update');
  // }

  render () {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(igkey => {
        return (
          <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}>
              {igkey} 
            </span>
            : {this.props.ingredients[igkey]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          { ingredientsSummary }
        </ul>
        <p>
        Total Price: <strong> &#8377; {this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}


export default OrderSummary;