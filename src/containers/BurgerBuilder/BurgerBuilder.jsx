import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIng();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientsHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientsHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.navigate('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.navigate('/checkout');
  }

  render() {
    const disabledInfo = {...this.props.ings};

    // converting as boolean { salad: true, bacon: false, ...}
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const maxAllowedIngsInfo = {...this.props.ings};

    for(let key in maxAllowedIngsInfo) {
      maxAllowedIngsInfo[key] = maxAllowedIngsInfo[key] >= this.props.maxAllowedIng;
    }

    let burgerAndBuildCntrComp = this.props.error ? <p>Unable to fetch ingredients!</p> : <Spinner />; 
    let orderSummaryComp = null;

    if (this.props.ings) {
      burgerAndBuildCntrComp = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientsAdded={this.props.onIngAdded}
            ingredientsRemoved={this.props.onIngRemoved}
            disabled={disabledInfo}
            maxAllowedIng={maxAllowedIngsInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price} 
            basePrice={this.props.basePrice}
            ordered = {this.purchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      );

      orderSummaryComp = <OrderSummary  ingredients={this.props.ings} 
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price.toFixed(2)} />;
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    basePrice: state.burgerBuilder.basePrice,
    maxAllowedIng: state.burgerBuilder.maxAllowedIng,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIng: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorhandler(BurgerBuilder, axios)));