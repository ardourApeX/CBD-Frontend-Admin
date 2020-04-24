import * as actionTypes from "../actions/actions";
const initialState = {
	shop: {
		title: "a",
		bundleTitle: "b",
		bundleSubTitle: "c",
	},
};

const get = (action) => {
	console.log("In get reducer", action);
	return {
		...action.data,
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
		case actionTypes.GET_SHOP:
			return get(action);
		case actionTypes.UPDATE_SHOP:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
