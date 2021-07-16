import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

console.log('ok');

const getAccount = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
};

getAccount();

var provider2;

const detectProvider = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    // startApp(provider); // initialize your app
    const web3 = new Web3(provider);
    console.log(provider);
    provider2 = provider;
    // await window.ethereum.enable();
  } else {
    console.log('Please install MetaMask!');
  }
  return provider;
}

detectProvider();

console.log(provider2);

ReactDOM.render(
  <React.StrictMode>
    <App provider={provider2}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
