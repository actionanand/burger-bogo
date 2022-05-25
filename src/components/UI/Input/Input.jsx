import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputEl = null;

  switch(props.inputType) {
    case ('input'):
      inputEl = <input {...props} className={classes.InputElement} />;
      break;
    case ('textarea'):
      inputEl = <textarea {...props} className={classes.InputElement} />;
      break;
    default:
      inputEl = <input {...props} className={classes.InputElement} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {props.label} </label>
      {inputEl}
    </div>
  );
}

export default input;