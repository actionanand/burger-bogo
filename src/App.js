import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import withRouter from './hoc/withRouter/withRouter';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    const shouldRedirect = true;
    
    let routes = (
      <Routes>
        <Route path='/' element={<BurgerBuilder/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='*' element={shouldRedirect ? <Navigate replace to='/' /> : null } />
      </Routes>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path='/' element={<BurgerBuilder/>} />
          <Route path='/checkout/*' element={<Checkout/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='*' element={shouldRedirect ? <Navigate replace to='/' /> : null } />
        </Routes>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
