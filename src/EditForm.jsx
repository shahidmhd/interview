import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

function EditForm() {
     // Use the dispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Use the state hook to manage the form inputs
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');

  // Handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Validate the inputs
    if (!customer || !amount) {
      alert('Please enter the customer name and the amount');
      return;
    }

    // Create a new invoice object
    const invoice = {
      id: nanoid(),
      customer,
      amount: Number(amount),
    };

  

    // Reset the form inputs
    setCustomer('');
    setAmount('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div className="flex gap-4">
      <label htmlFor="customer" className="w-1/4">
        Customer Name
      </label>
      <input
        type="text"
        id="customer"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="w-3/4 border p-2"
      />
    </div>
    <div className="flex gap-4">
      <label htmlFor="amount" className="w-1/4">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-3/4 border p-2"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white p-2">
      Create Invoice
    </button>
  </form>
  )
}

export default EditForm
