import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputEl = null;

  switch(props.elementType) {
    case ('input'):
      inputEl = (<input 
        {...props.elementConfig} 
        className={classes.InputElement} 
        value={props.value} />);
      break;
    case ('textarea'):
      inputEl = (<textarea 
        {...props.elementConfig} 
        className={classes.InputElement} 
        value={props.value} />);
      break;
      case ('select'):
        inputEl = (
          <select className={classes.InputElement} value={props.value} >
            {props.elementConfig.options.map(option => (
              <option value={option.value} key={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
        break;
    default:
      inputEl = (<input 
        {...props.elementConfig} 
        className={classes.InputElement} 
        value={props.value} />);
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {props.label} </label>
      {inputEl}
    </div>
  );
}

export default input;