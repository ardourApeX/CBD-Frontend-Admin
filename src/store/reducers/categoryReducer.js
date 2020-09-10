import * as actionTypes from "../actions/actions";
const initialState = {
	topicals: {},
	pets: {},
	edibles: {},
	capsules: {},
	oils: {},
	bundles: {},

	default: {},
};

const get = (action) => {
	console.log("In get reducer", action);
	return {
		data:action.data,
		categories:action.categories,
	};
};
const update = (state, action) => {
	// let curValue=state[action.section];
	// curValue=action.data;
	return {
		...state,
		[action.section]: action.data,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_CATEGORY:
			return get(action);
		case actionTypes.UPDATE_CATEGORY:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
