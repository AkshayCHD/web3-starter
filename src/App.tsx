import React, { Component } from 'react';
import './App.css';
import EVMContract from './abis/EVMContract.json'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { loadWeb3, getAccountInformation, loadContractInstance } from './utils/getWeb3' 
import Header from './components/Header'

interface IProps {
  setAccountAddress: (account: String) => void,
  setContractInstance: (contract: Object) => void
}

interface IState {
}

class App extends Component<IProps, IState> {
  async componentDidMount() {
    await this.refreshWeb3()
    window.ethereum.on('accountsChanged', async () => {
      await this.refreshWeb3()
      alert('Account Changed')
    })
  }

  async refreshWeb3() {
    await loadWeb3();
    const account = await getAccountInformation();
    if(account !== undefined) {
      this.props.setAccountAddress(account);
    }
    const evmContract = await loadContractInstance(EVMContract);
    if(evmContract !== undefined) {
      this.props.setContractInstance(evmContract);
    }
  }

  render() {
    return (
      <div className="App">
        <Header account="" contract={null} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAccountAddress: (account: String) => dispatch({type: 'SET_ACCOUNT', account: account}),
    setContractInstance: (contract: Object) => dispatch({type: 'SET_CONTRACT', contract: contract})
  }
}

export default connect(null, mapDispatchToProps)(App);

declare global {
	interface Window {
		ethereum: any;
		web3: any;
	}
	interface Contract {
			abi: Object,
			networks: Networks
	}
	interface State {
			account: String;
			contract: Object;
	}
	interface Network {
			events: Object,
			links: Object,
			address: String,
			transactionHash: String
	}
	interface Networks {
			[key: string]: Network;
	}
}