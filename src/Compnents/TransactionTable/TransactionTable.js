import React, { Component } from 'react';
import styles from './TransactionTable.module.css';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatCost(cost) {
    const newCost = cost;

    if (!newCost.includes('.')) {
      return '$' + newCost + '.00';
    }

    let postDecimalStartIndex;
    for(let i = 0; i < newCost.length; i++) {
      if(newCost[i] === '.') {
        postDecimalStartIndex = i + 1;
      }
    }

    if (newCost.slice(postDecimalStartIndex).length < 2) {
      return '$' + newCost + '0';
    }

    if(newCost.slice(postDecimalStartIndex).length > 2) {
      return '$' + newCost.slice(0, postDecimalStartIndex) + newCost.slice(postDecimalStartIndex, 2);
    }

    return '$' + newCost;
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th className={styles.itemColumnHead}>Item</th>
            <th className={styles.costColumnHead}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.transactions.map((transaction, index) => {
              return (
                index % 2 === 0 ?
                  <tr key={transaction.id} className={styles.tableRowEven}>
                    <td className={styles.itemColumn}>{transaction.item}</td>
                    <td className={styles.costColumn}>{this.formatCost(transaction.cost)}</td>
                  </tr> :
                  <tr key={transaction.id} className={styles.tableRowOdd}>
                    <td className={styles.itemColumn}>{transaction.item}</td>
                    <td className={styles.costColumn}>{this.formatCost(transaction.cost)}</td>
                  </tr>
              )
            })
          }
        </tbody>
      </table>
      
    );
  }
}

export default TransactionTable;