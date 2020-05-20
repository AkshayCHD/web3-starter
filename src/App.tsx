import React, { Component } from 'react';
import './App.css';
import EVMContract from './abis/EVMContract.json'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { loadWeb3, getAccountInformation, loadContractInstance } from './utils/getWeb3'
import Header from './components/Header'
import { Contract } from 'ethers';
import { StateInterface } from './store/reducer'

interface IProps {
	contract: Contract,
	account: String,
  setAccountAddress: (account: String) => void,
  setContractInstance: (contract: Contract) => void
}

interface IState {
}

class App extends Component<IProps, IState> {
  state = {
    error: null
  }
  async componentDidMount() {
    await this.refreshWeb3()
  }

  async refreshWeb3() {
    try {
      await loadWeb3();
      const account = await getAccountInformation();
      if(account !== undefined) {
        this.props.setAccountAddress(account);
			}
      const evmContract = await loadContractInstance(JSON.stringify(EVMContract.abi), "0xDd35546E7b7a1E2a394Fc387Ace2E84F3e4C3ab9");
      if(evmContract !== undefined) {
        this.props.setContractInstance(evmContract);
			}
      window.ethereum.on('accountsChanged', async () => {
        await this.refreshWeb3()
        alert('Account Changed')
      })
    } catch(error) {
      this.setState({ error: error.toString() })
    }
  }

  render() {
    if(this.state.error) {
      return <h1>{this.state.error}</h1>
    } else {
      return (
        <div className="App">
          <Header account="" contract={this.props.contract} />
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAccountAddress: (account: String) => dispatch({type: 'SET_ACCOUNT', account: account}),
    setContractInstance: (contract: Contract) => dispatch({type: 'SET_CONTRACT', contract: contract})
  }
}

const mapStateToProps = (state: StateInterface) => {
	return {
		contract: state.contract,
		account: state.account
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

declare global {
	interface Window {
		ethereum: any;
		web3: any;
	}
}
