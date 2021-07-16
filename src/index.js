import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';

console.log('ok');

// const getAccount = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts[0]);
// };

// getAccount();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
