import * as actionTypes from "../actions/actions";
const initialState = {
	banner: {
		title: "a",
		content: "b",
		btnText: "c",
	},
	categorySlider: {
		title: "",
	},
	thirdSection: {
		bigTitle: "",
		title: "",
		content: "",
		btnText: "",
	},
	bundlesSlider: {
		title: "",
		subTitle: "",
		btnText: "",
	},
	fifthSection: {
		title: "",
		content: "",
		btnText: "",
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
		case actionTypes.GET_HOME:
			return get(action);
		case actionTypes.UPDATE_HOME:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
