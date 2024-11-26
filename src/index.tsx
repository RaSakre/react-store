import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './utils/store'
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
		<BrowserRouter>
		<Provider store={store}>
    <App />
		</Provider>
		</BrowserRouter>
  </React.StrictMode>
);

