import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(resp => {
        this.setState({ingredients: resp.data});
      })
      .catch(err => {
        this.setState({error: true});
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('You Continue!');
    // this.setState({loading: true});

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Anand Raja',
    //     address: {
    //       street: 'Test street 13',
    //       zipCode: '23761',
    //       country: 'India'
    //     },
    //     email: 'ar@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };

    // axios.post('/order.json', order)
    //   .then(resp => {
    //     this.setState({loading: false, purchasing: false});
    //     console.log(resp)
    //   })
    //   .catch(err => {
    //     this.setState({loading: false, purchasing: false});
    //     console.log(err)
    //   });

    const queryParams = [];

    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

    }

    const queryString = queryParams.join('&');

    // this.props.navigate('/checkout');

    this.props.navigate({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disabledInfo = {...this.state.ingredients};

    // converting as boolean { salad: true, bacon: false, ...}
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burgerAndBuildCntrComp = this.state.error ? <p>Unable to fetch ingredients!</p> : <Spinner />; 
    let orderSummaryComp = null;

    if (this.state.ingredients) {
      burgerAndBuildCntrComp = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientsAdded={this.addIngredientsHandler}
            ingredientsRemoved={this.removeIngredientsHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice} 
            ordered = {this.purchaseHandler} />
        </Aux>
      );

      orderSummaryComp = <OrderSummary  ingredients={this.state.ingredients} 
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)} />;
    }


    if(this.state.loading) {
      orderSummaryComp = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummaryComp}
        </Modal>
          {burgerAndBuildCntrComp}
      </Aux>
    );
  }
}

export default withRouter(withErrorhandler(BurgerBuilder, axios));