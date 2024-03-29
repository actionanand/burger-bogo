import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({isAuthenticted}) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {isAuthenticted ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {isAuthenticted 
      ? <NavigationItem link="/logout">Logout</NavigationItem>
      : <NavigationItem link="/auth">Authentication</NavigationItem>
    }
    
  </ul>
);
export default navigationItems;