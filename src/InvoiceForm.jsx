// components/InvoiceForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addInvoice } from './Store';

export function InvoiceForm() {
  const dispatch = useDispatch();

  const [invoices, setInvoices] = useState([
    {
      id: nanoid(),
      customer: '',
      amount: '',
      quantity: '',
      totalAmount: 0,
    },
  ]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].quantity = newQuantity;
    updatedInvoices[index].totalAmount = newQuantity * updatedInvoices[index].amount;
    setInvoices(updatedInvoices);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index][field] = value;

    if (field === 'quantity' || field === 'amount') {
      updatedInvoices[index].totalAmount =
        updatedInvoices[index].quantity * updatedInvoices[index].amount;
    }

    setInvoices(updatedInvoices);
  };

  const handleAmountChange = (index, newAmount) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].amount = newAmount;
    updatedInvoices[index].totalAmount = newAmount * updatedInvoices[index].quantity;
    setInvoices(updatedInvoices);
  };

  const handleAddRow = () => {
    setInvoices([...invoices, { id: nanoid(), customer: '', amount: '', quantity: '', totalAmount: 0 }]);
  };
  const calculateTotalAmount = () => {
    return invoices.reduce((total, invoice) => total + invoice.totalAmount, 0);
  };

  const handleDeleteRow = (index) => {
    const updatedInvoices = [...invoices];
    updatedInvoices.splice(index, 1);
    setInvoices(updatedInvoices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (invoices.length <=0 && invoices.some((invoice) => !invoice.customer || !invoice.amount || !invoice.quantity)) {
      alert('Please enter customer name, quantity, and amount for all rows');
      return;
    }

    dispatch(addInvoice(invoices));

    // Reset the form by initializing with a single empty row
    setInvoices([{ id: nanoid(), customer: '', amount: '', quantity: '', totalAmount: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {invoices.map((invoice, index) => (
        <div key={invoice.id} className="flex flex-row gap-4">
          <div className="flex gap-4">
            <label htmlFor={`customer${index}`} className="w-1/4">
              Customer Name
            </label>
            <input
              type="text"
              id={`customer${index}`}
              value={invoice.customer}
              onChange={(e) => handleInputChange(index, 'customer', e.target.value)}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor={`quantity${index}`} className="w-1/4">
              Quantity
            </label>
            <input
              type="number"
              id={`quantity${index}`}
              value={invoice.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor={`amount${index}`} className="w-1/4">
              Amount
            </label>
            <input
              type="number"
              id={`amount${index}`}
              value={invoice.amount}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor={`totalAmount${index}`} className="w-1/4">
              Total Amount
            </label>
            <input
              type="text"
              id={`totalAmount${index}`}
              value={invoice.totalAmount}
              readOnly
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAddRow()}
              className="bg-green-500 text-white p-2"
            >
              + Add Row
            </button>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleDeleteRow(index)}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
       <div className="flex ml-auto gap-4 ">
            <h1
             
              className=" text-gray p-2"
            >
              Total Amount: <strong>{calculateTotalAmount()}</strong>
            </h1>
          </div>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Invoices
      </button>
    </form>
  );
}
