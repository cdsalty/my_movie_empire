import React from 'react';

import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';

import App from './App';
// import store from '../src/app/store';
import store from './app/store';

const theme = createTheme({});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    ,
  </Provider>,
  document.getElementById('root')
);
