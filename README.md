# Web3-Starter
The project aims at creating a production ready starter code that can help you kick start your dapp development process 
fairly easily.

## Salient Features
* All the code related to web3 is in a single utils file, web3 has not even been imported anywhere else.
* The contract instance and current account are stored globally, and can be accessed and managed using redux.
* The project is easily extensible to load multiple contacts as the code to load and store contracts in pretty generic.

## Getting Started
### Dependencies
Please make sure that you have ganache, truffle framework and metamask browser extention installed

### Steps
* Load ganache
* Select local network on the network tab in metamask
* Now move into the project directory
* Run command, to compile your contracts
```
truffle complile
```

* Then deploy your contract on the local blockchain
```
truffle migrate --reset
```
* Run npm start to start the project.

## Loading Your Contract
To store your contract globally, add your contract to ```src/contract``` folder, then change the migrations file in ```./migrations``` directory.
After that when you compile and migrate the contract you will see new json file in ```./src/contracts``` directory.
Load this file in 
```./src/App.tsx```
and load the contract globally
```
import NewContract from './abis/NewContract.json'
...
...

async refreshWeb3() {
    ...
    const newContract = await loadContractInstance();
    if(newContract !== undefined) {
      this.props.setContractInstance(newContract);
    }
}
```
The contract will be loaded globally and can be accessed in any component by mapping global state to props like
```
import { connect } from 'react-redux';
...
...
const mapStateToProps = (state: State) => {
	return {
		contract: state.contract,
		account: state.account
	}
}
export default connect(mapStateToProps, null)(Header)
```
You can access the contract using ```props.contract```.