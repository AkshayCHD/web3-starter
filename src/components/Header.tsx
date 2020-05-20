import React, { useState, useEffect } from 'react'
import '../App.css';
import { connect } from 'react-redux';
import { Contract } from 'ethers';
import { StateInterface } from '../store/reducer'

interface IProps {
	account: any;
	contract: Contract;
}

const Header = (props: IProps) => {
	const [adminAddress, setAdminAddress] = useState('');

	useEffect(() => {
		if(props.contract.functions !== undefined) {
			const prom = props.contract.functions.admin().then((result) => setAdminAddress(result))
			console.log(prom);
		}
	}, [props.contract])

  return <div>
		<div id="header">
			<span id="account">Current Account Address: {props.account}</span>
		</div>
		<div id="header">
			<span id="admin">Contract Admin Address: {adminAddress}</span>
		</div>
		<div id="header">
			<span id="contract">Contract Address: {(props.contract) ? props.contract.address : "asdsd"}</span>
		</div>
	</div>
}

const mapStateToProps = (state: StateInterface) => {
	return {
		contract: state.contract,
		account: state.account
	}
}
export default connect(mapStateToProps, null)(Header)
