import * as actionTypes from "../actions/actions";

const initialstate = {
	page: [],
};

const getKeywords = (state, action) => {
	return {
		page: action.page,
	};
};

const reducer = (state = initialstate, action) => {
	switch (action.type) {
		case actionTypes.GET_KEYWORD:
			return getKeywords(state, action);

		default:
			return state;
	}
};

export default reducer;
