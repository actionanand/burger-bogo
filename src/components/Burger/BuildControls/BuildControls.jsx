import React from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong> &#8377; { props.price > props.basePrice ? props.price.toFixed(2) : 0 } </strong></p>
    { controls.map(ctrl => (
      <BuildControl 
      key={ctrl.label} 
      label={ctrl.label}
      added={() => props.ingredientsAdded(ctrl.type)}
      removed={() => props.ingredientsRemoved(ctrl.type)}
      disabled={props.disabled[ctrl.type]}
      maxAllowedIng={props.maxAllowedIng[ctrl.type]} />
    )) }
    <button className={classes.OrderButton} 
    disabled={!props.purchasable} 
    onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'} 
    </button>
  </div>
);

export default buildControls;