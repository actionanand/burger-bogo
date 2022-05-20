import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: true
  };

  sideDrawerClosingHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render () {
    return (
      <Aux>
        <Toolbar />
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