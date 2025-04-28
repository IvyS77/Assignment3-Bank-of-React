/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState } from 'react';
import { Link }        from 'react-router-dom';
import AccountBalance  from './AccountBalance';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount,      setAmount     ] = useState('');

  const debitsView = props.debits.map(d => {
    const date = d.date.slice(0,10);
    return (
      <li key={d.id}>
        {d.amount.toFixed(2)} — {d.description} — {date}
      </li>
    );
  });

  const handleSubmit = e => {
    e.preventDefault();
    props.addDebit(e);       
    setDescription('');      
    setAmount('');
  };

  return (
    <div>
      <h1>Debits</h1>

      {/* Show current balance */}
      <AccountBalance accountBalance={props.accountBalance} />

      {/* List of debits */}
      <ul>{debitsView}</ul>

      {/* Form to add new debit */}
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
        <button type="submit">Add Debit</button>
      </form>

      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
