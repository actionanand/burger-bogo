import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
          },
          value: ''
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Zip code'
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-mail'
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: ''
        },
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};

    for(let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(resp => {
        this.setState({loading: false});
        console.log(resp)
        this.props.navigate('/');
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err)
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFormEl = { ...updatedOrderForm[inputIdentifier] };

    updatedFormEl.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormEl;
    this.setState({orderForm: updatedOrderForm});
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
            changed={(event) => this.inputChangedHandler(event, formEl.id)} />
        ))}
        <Button btnType='Success'>ORDER</Button>
      </form>
    );

    if(this.state.loading) {
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

export default ContactData;