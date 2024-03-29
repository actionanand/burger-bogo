import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerClosingHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render () {
    return (
      <Aux>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler} 
          isAuth={this.props.isAuthenticated} />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosingHandler}
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};


export default connect(mapStateToProps)(Layout);