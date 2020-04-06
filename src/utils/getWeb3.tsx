import Web3 from 'web3';
import EVMContract from '../abis/EVMContract.json'
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

interface Network {
	events: object,
	links: object,
	address: string,
	transactionHash: string
}
interface Networks {
	[key: string]: Network;
}

const loadWeb3 = async () => {
	try { 
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			console.log(window);
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			console.log(window);
		}
		else {
			window.alert('Metamask is not installed.');
		}
	} catch(error){
		console.log("error in loadWeb3",error);
	}
}

const getAccountInformation = async () : Promise<string | undefined> => {
	try {
		const web3 = window.web3
		// Load account
    const accounts = await web3.eth.getAccounts();
    if(!accounts) {
      throw new Error("No accounts present")
    }
    const account = accounts[0]
    if(!account) {
      throw new Error("No accounts present")
    }
    return account;
  } catch(error){
		console.log("error in loadAccountInformation", error);
	}
}

const getContractInstance = async () : Promise<object | undefined> => {
  try {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId();
		const networks: Networks = EVMContract.networks;
		const networkData = networks[networkId];
		if (networkData) {
			const evmContract = new web3.eth.Contract(EVMContract.abi, networkData.address)
      console.log(evmContract);
      return evmContract
		} else {
			alert("Sorry you are on wrong network");
		}
  } catch(error) {
  	console.log("error in loadAccountInformation", error);  
  }
}

export { loadWeb3, getAccountInformation, getContractInstance}