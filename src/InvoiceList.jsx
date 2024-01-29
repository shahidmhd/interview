// components/InvoiceList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice } from './Store';

// A component for displaying the list of invoices
export function InvoiceList() {
  // Use the selector hook to access the invoices state
  const invoices = useSelector((state) => state.invoice);

  // Use the dispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Handle the delete button click
  const handleDelete = (id) => {
    // Dispatch the deleteInvoice action with the id
    dispatch(deleteInvoice(id));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Invoices</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="border p-2">{invoice.customer}</td>
              <td className="border p-2">{invoice.amount}</td>
              
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(invoice.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}