import Web3 from 'web3';

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
		window.ethereum.on('accountsChanged', async function (accounts: [String]) {
			await loadWeb3()
		})
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

const loadContractInstance = async (Contract: Contract) : Promise<object | undefined> => {
  try {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId();
	  const networks: Networks = Contract.networks;
	  const networkData = networks[networkId];
	  if (networkData) {
	    const contract = new web3.eth.Contract(Contract.abi, networkData.address)
      console.log(contract);
      return contract
		} else {
			alert("Sorry you are on wrong network");
		}
  } catch(error) {
  	console.log("error in loadAccountInformation", error);  
  }
}

export { loadWeb3, getAccountInformation, loadContractInstance }