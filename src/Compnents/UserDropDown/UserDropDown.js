import React from 'react';
import styles from './UserDropDown.module.css'

const userDropDown = (props) => {
  return (
    <select onChange={props.handleChange} className={styles.dropDown}>
      <option value="Josh">Josh</option>
      <option value="Diana">Diana</option>
    </select>
  );
}

export default userDropDown;