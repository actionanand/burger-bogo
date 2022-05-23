import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input type='text' name='name' placeholder='Your Name' />
          <input type='email' name='email' placeholder='Your E-mail' />
          <input type='text' name='street' placeholder='Your Street' />
          <input type='text' name='postal' placeholder='Your Postal code' />
          <Button btnType='Success'>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;