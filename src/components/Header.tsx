import React, { useState, useEffect } from 'react'
import '../App.css';
import { connect } from 'react-redux';

interface IProps {
	account: any;
	contract: any;
}

const Header = (props: IProps) => {
	const [adminAddress, setAdminAddress] = useState('');
	useEffect(() => {
		if(props.contract.methods !== undefined) {
			props.contract.methods.admin().call((error, result) => {
				setAdminAddress(result.toString())
			});
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
			<span id="contract">Contract Address: {(props.contract.options) ? props.contract.options.address : "asdsd"}</span>
		</div>
	</div>
}

const mapStateToProps = (state: State) => {
	return {
		contract: state.contract,
		account: state.account
	}
}
export default connect(mapStateToProps, null)(Header)