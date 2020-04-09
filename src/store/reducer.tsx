const initalState = {
    account: '',
    contract: {}
}

interface Action {
    type: String;
    contract: Object;
    account: String;
}
// takes the action and current state as argument and returns the updated state
const rootReducer = (state = initalState, action: Action) => {
	switch(action.type) {
		case 'SET_ACCOUNT':
			return {
				...state,
				account: action.account
			}
		break;
		case 'SET_CONTRACT':
			return {
				...state,
				contract: action.contract
			}
		break;
	}
  return state;
};

export default rootReducer;