import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import EVMContract from '../abis/EVMContract.json'
import { loadWeb3, getAccountInformation, getContractInstance } from '../utils/getWeb3' 
import { Header } from './Header'
class App extends Component {

  state = {
    account: null,
    evmContract: null
  }

  async componentDidMount() {
    await loadWeb3();
  }

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
