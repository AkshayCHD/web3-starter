import Web3 from 'web3';

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log(window);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log(window);
  } else {
    throw new Error("Metamask Not Installed")
  }
}

const getAccountInformation = async () : Promise<string | undefined> => {
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0]
  if(!account) {
    throw new Error("No Accounts Present")
  }
  return account;
}

const loadContractInstance = async (Contract: Contract) : Promise<object | undefined> => {
  const web3 = window.web3
  console.log(web3.eth.net)
  const networkId = await web3.eth.net.getId();
  const networks: Networks = Contract.networks;
  const networkData = networks[networkId];
  if (networkData) {
    const contract = new web3.eth.Contract(Contract.abi, networkData.address)
    console.log(contract);
    return contract
  } else {
    throw new Error("Wrong Network Selected")
  }
}

export { loadWeb3, getAccountInformation, loadContractInstance }