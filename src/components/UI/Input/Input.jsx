import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    case ('input'):
      inputEl = (<input 
        {...props.elementConfig} 
        className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed} />);
      break;
    case ('textarea'):
      inputEl = (<textarea 
        {...props.elementConfig} 
        className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed} />);
      break;
      case ('select'):
        inputEl = (
          <select className={inputClasses.join(' ')} value={props.value}
          onChange={props.changed} >
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
        className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed} />);
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {props.label} </label>
      {inputEl}
    </div>
  );
}

export default input;