import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} 
      className={({ isActive }) => {
        const linkClasses = [];
        if(isActive) linkClasses.push(classes.active);
        return linkClasses.join(' ');
      }} >
      {props.children}
    </NavLink>
  </li>
);


export default navigationItem;