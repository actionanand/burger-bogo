import React from 'react';

import classes from './SideDrawer.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../Logo/Logo';
import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open}  clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticted={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}


export default sideDrawer;