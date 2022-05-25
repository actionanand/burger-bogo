import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Anand Raja',
        address: {
          street: 'Test street 13',
          zipCode: '23761',
          country: 'India'
        },
        email: 'ar@test.com'
      },
      deliveryMethod: 'fastest'
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

  render () {
    let formEl = (
      <form>
        <Input inputType='input' type='text' name='name' placeholder='Your Name' />
        <Input inputType='input' type='email' name='email' placeholder='Your E-mail' />
        <Input inputType='input' type='text' name='street' placeholder='Your Street' />
        <Input inputType='input' type='text' name='postal' placeholder='Your Postal code' />
        <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
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