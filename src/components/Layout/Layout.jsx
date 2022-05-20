import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
          closed={this.sideDrawerClosingHandler}
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}


export default Layout;