import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/validation';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
  };


  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }) 
    });

    this.setState({controls: updatedControls});
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModehandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp};
    });
  }


  render() {
    const formElemenrArray = [];

    for (let key in this.state.controls) {
      formElemenrArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElemenrArray.map(formEl => (
      <Input key={formEl.id}
      elementType={formEl.config.elementType} 
      elementConfig={formEl.config.elementConfig} 
      value={formEl.config.value}
      invalid={!formEl.config.valid}
      shouldValidate={formEl.config.validation}
      touched={formEl.config.touched}
      changed={(event) => this.inputChangedHandler(event, formEl.id)} />
    ));

    if(this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;

    if(this.props.error) {
      errorMsg = (
        <p> {this.props.error.message} </p>
      );
    }

    let redirectToHome = null;

    if(this.props.isAuthenticated) {
      redirectToHome = <Navigate to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {redirectToHome}
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'> SUBMIT </Button>
        </form>
        <Button btnType="Danger"
          clicked={this.switchAuthModehandler} >
          SWITCH TO SIGN { this.state.isSignUp ? 'IN' : 'UP' } 
        </Button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);