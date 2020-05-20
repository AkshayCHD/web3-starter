import { Contract } from 'ethers';

const initialState = {
    account: '',
    contract: {}
}

export interface StateInterface {
	account: String;
	contract: Contract;
}

// takes the action and current state as argument and returns the updated state
const rootReducer = (state = initialState, action: any) => {
	switch(action.type) {
		case 'SET_ACCOUNT':
			return {
				...state,
				account: action.account
			}
		case 'SET_CONTRACT':
			return {
				...state,
				contract: action.contract
			}
	}
  return state;
};

export default rootReducer;
