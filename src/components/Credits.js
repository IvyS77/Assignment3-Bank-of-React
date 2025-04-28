/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState } from 'react';
import { Link }        from 'react-router-dom';
import AccountBalance  from './AccountBalance';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount,      setAmount     ] = useState('');

  const creditsView = props.credits.map(item => {
    const date = item.date.slice(0,10);
    return (
      <li key={item.id}>
        {item.amount.toFixed(2)} — {item.description} — {date}
      </li>
    );
  });

  const handleSubmit = e => {
    e.preventDefault();
    props.addCredit(e);      
    setDescription('');      
    setAmount('');
  };

  return (
    <div>
      <h1>Credits</h1>

      {/* Show current balance */}
      <AccountBalance accountBalance={props.accountBalance} />

      {/* List of credits */}
      <ul>{creditsView}</ul>

      {/* Form to add new credit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="amount"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit">Add Credit</button>
      </form>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
