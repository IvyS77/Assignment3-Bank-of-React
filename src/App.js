/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import TransactionHistory from './components/TransactionHistory';
import AccountDetails from './components/AccountDetails';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Ivy Sun',
        memberSince: '03/28/25',
      }
    };
  }
  
    componentDidMount() {
      fetch('https://johnnylaicode.github.io/api/credits.json')
        .then(response => response.json())
        .then(data => {
          this.setState({ creditList: data }, this.calculateAccountBalance);
        });
      fetch('https://johnnylaicode.github.io/api/debits.json')
        .then(response => response.json())
        .then(data => {
          this.setState({ debitList: data }, this.calculateAccountBalance);
        });
    }
  
    calculateAccountBalance = () => {
      let totalCredits = this.state.creditList.reduce(
        (sum, credit) => sum + parseFloat(credit.amount), 0
      );
      let totalDebits = this.state.debitList.reduce(
        (sum, debit) => sum + parseFloat(debit.amount), 0
      );
      let balance = totalCredits - totalDebits;
      balance = Math.round(balance * 100) / 100;
      this.setState({ accountBalance: balance });
    }
  
    addCredit = (e) => {
      e.preventDefault();
      const description = e.target.description.value;
      const amount = parseFloat(e.target.amount.value);
      const newCredit = {
        id: Date.now(),
        description,
        amount,
        date: new Date().toISOString()
      };
      this.setState(
        prevState => ({ creditList: [...prevState.creditList, newCredit] }),
        this.calculateAccountBalance
      );
    }
  
    addDebit = (e) => {
      e.preventDefault();
      const description = e.target.description.value;
      const amount = parseFloat(e.target.amount.value);
      const newDebit = {
        id: Date.now(),
        description,
        amount,
        date: new Date().toISOString()
      };
      this.setState(
        prevState => ({ debitList: [...prevState.debitList, newDebit] }),
        this.calculateAccountBalance
      );
    }

  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );    
    const TransactionHistoryComponent = () => (<TransactionHistory />);
    const AccountDetailsComponent = () => (<AccountDetails />);

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Assignment3-Bank-of-React">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/transactions" render={TransactionHistoryComponent}/>
          <Route exact path="/account-details" render={AccountDetailsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
