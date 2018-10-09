import React from 'react';
import styles from './InputForm.module.css';

const inputForm = (props) => {
  return (
    <form className={styles.container} onSubmit={props.handleSubmit}>
      <p>Item</p>
      <input type="text" className={styles.itemName} autoFocus required placeholder="What was your purchase?"/>
      <p>Cost</p>
      <div className={styles.finalLine}>
        <input type="number" step="0.01" className={styles.moneySpent} placeholder="How much did it cost?"/>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
}

export default inputForm;