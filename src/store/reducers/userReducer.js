import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	user: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				user: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
