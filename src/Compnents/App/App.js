import React, { Component } from 'react';
import styles from './App.module.css';
import InputForm from '../InputForm/InputForm';
import UserDropDown from '../UserDropDown/UserDropDown';
import TransactionTable from '../TransactionTable/TransactionTable';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBQT4gagrmpd788PtTAHUbVMcUaI9UowOw",
  authDomain: "budgetor-8f433.firebaseapp.com",
  databaseURL: "https://budgetor-8f433.firebaseio.com",
  projectId: "budgetor-8f433",
  storageBucket: "",
  messagingSenderId: "1025319287803"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joshTransactionList: [],
      dianaTransactionList: [],
      activeUser: 'Josh',
      joshFunds: 450,
      dianaFunds: 450
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.outputFormattedFunds = this.outputFormattedFunds.bind(this);
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  componentDidMount() {
      this.database.ref('dianaTransactionList').on('value', snap => {
      snap.forEach(transaction => {
        let budgetItem = {id: transaction.key, cost: transaction.val().cost, item: transaction.val().item};
        let newBudget = this.state.dianaFunds - transaction.val().cost;
        this.setState({
          dianaTransactionList: [...this.state.dianaTransactionList, budgetItem],
          dianaFunds: newBudget
        });
      })
    });

    this.database.ref('joshTransactionList').on('value', snap => {
      snap.forEach(transaction => {
        let budgetItem = {id: transaction.key, cost: transaction.val().cost, item: transaction.val().item};
        let newBudget = this.state.joshFunds - transaction.val().cost;
        this.setState({
          joshTransactionList: [...this.state.joshTransactionList, budgetItem],
          joshFunds: newBudget
        });
      })
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let itemValue = event.target.children[1].value;
    let costValue = event.target.children[3].firstChild.value;
    const item = event.target.children[1];
    const cost = event.target.children[3].firstChild;

    if (this.state.activeUser === 'Josh') {
      this.database.ref('joshTransactionList').push({cost: costValue, item: itemValue});
    } else {
      this.database.ref('dianaTransactionList').push({cost: costValue, item: itemValue});
    }

    item.value = '';
    cost.value = '';
    item.focus();
  }

  handleChange(event) {
    this.setState({activeUser: event.target.value});
  }

  outputFormattedFunds() {
    if (this.state.activeUser === 'Josh') {
      if (this.state.joshFunds < 0) {
        return (
          <h2 className={styles.remainingBudgetNegative}>({this.formatCost(Math.abs(this.state.joshFunds))})</h2>
        )
      } else {
        return (
          <h2 className={styles.remainingBudget}>{this.formatCost(this.state.joshFunds)}</h2>
        )
      }
    } else {
      if (this.state.dianaFunds < 0) {
        return (
          <h2 className={styles.remainingBudgetNegative}>({this.formatCost(Math.abs(this.state.dianaFunds))})</h2>
        )
      } else {
        return (
          <h2 className={styles.remainingBudget}>{this.formatCost(this.state.dianaFunds)}</h2>
        )
      }
    }
  }

  formatCost(cost) {
    const newCost = cost.toString();

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

  getCostFromString(cost) {
    return cost.slice(1);
  }

  render() {
    return (
      <div className={styles.App}>
        <UserDropDown handleChange={this.handleChange} />
        <h1 className={styles.title}>{this.state.activeUser}'s Budget</h1>
        {this.outputFormattedFunds()}
        <InputForm handleSubmit={this.handleSubmit} />
        {
          this.state.activeUser === 'Josh' ? 
            <TransactionTable transactions={this.state.joshTransactionList} /> :
            <TransactionTable transactions={this.state.dianaTransactionList} />
        }
      </div>
    );
  }
}

export default App;
