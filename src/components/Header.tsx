import React, { useEffect, useState } from 'react'
import { getAccountInformation, getContractInstance } from '../utils/getWeb3' 
import './App.css';

const Header = () => {
	const [account, setAccount] = useState('')
	const [evmContract, setEvmContract] = useState({})

	useEffect(() => {
		getAccountInformation().then((account) => {
			if(!account) {
				throw new Error("bad thing happened")
			}
			setAccount(account)
		});
		getContractInstance().then((evmContract) => {
			if(!evmContract) {
				throw new Error("bad thing happened")
			}
			setEvmContract(evmContract)
		});
	}, [])

  return <div id="header">
		<span id="address">Address: {account}</span>
	</div>
}
export { Header }