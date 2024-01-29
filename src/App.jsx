// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';

import './App.css';
import { InvoiceForm } from './InvoiceForm';
import { InvoiceList } from './InvoiceList';
import EditForm from './EditForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="text-4xl font-bold text-center py-4">Billing App</h1>
        <div className="container mx-auto px-4">
          <InvoiceForm />
          <InvoiceList />
        </div>
      </div>
    </Provider>
  );
}

export default App;