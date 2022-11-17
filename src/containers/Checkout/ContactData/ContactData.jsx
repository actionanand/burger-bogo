import React, { Component } from 'react';

import { connect } from 'react-redux';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withRouter from '../../../hoc/withRouter/withRouter';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Zip code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 6
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-mail'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: 'cheapest',
          validation: {},
          valid: true
        },
    },
    isFormValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;

    if(!rules) {
      return;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for(let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);

  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFormEl = { ...updatedOrderForm[inputIdentifier] };

    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
    updatedFormEl.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormEl;

    let isFormValid = true;
    for(let formIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[formIdentifier].valid && isFormValid;
    }

    this.setState({orderForm: updatedOrderForm, isFormValid});
  }

  render () {
    const formElemenrArray = [];

    for (let key in this.state.orderForm) {
      formElemenrArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let formEl = (
      <form onSubmit={this.orderHandler} >
        {formElemenrArray.map(formEl => (
          <Input key={formEl.id}
            elementType={formEl.config.elementType} 
            elementConfig={formEl.config.elementConfig} 
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={(event) => this.inputChangedHandler(event, formEl.id)} />
        ))}
        <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );

    if(this.props.loading) {
      formEl = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {formEl}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorhandler(ContactData, axios)));