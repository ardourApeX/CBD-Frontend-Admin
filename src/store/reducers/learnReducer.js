import * as actionTypes from "../actions/actions";
const initialState = {
  learnData: [],
  learnFirstLoad: true,
};

const get = (state, action) => {
  console.log("In get reducer", action);
  return {
    learnData: action.data,
    learnFirstLoad: false,
  };
};

const addLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  currentData.push(action.data);
  return {
    learnData: currentData,
  };
};

const editLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  console.log(action.index);
  currentData[action.index].title = action.title;
  return {
    ...state,
    // learnData: currentData.map((data) => {
    //   if (data._id === action._id) {
    //     data.title = action.title;
    //   }
    //   return data;
    // }),
    learnData: currentData,
  };
};

const deleteLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  currentData.splice(action.index, 1);
  return {
    ...state,
    learnData: currentData,
  };
};

const addSubLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  currentData[action.index] = action.data;
  return {
    ...state,
    learnData: currentData,
  };
};

const editSubLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  if (action.editType === "subTitle") {
    currentData[action.index].sublearn[action.index1].subTitle = action.data;
  } else {
    currentData[action.index].sublearn[action.index1].content = action.data;
  }
  return {
    ...state,
    // learnData: currentData.map((data) => {
    //   if (data._id === action.mainId) {
    //     data.sublearn.map((data1) => {
    //       if (data1._id === action.subId) {
    //         if (action.editType === "subTitle") {
    //           data1.subTitle = action.data;
    //         } else {
    //           data1.content = action.data;
    //         }
    //       }
    //       return data1;
    //     });
    //   }
    //   return data;
    // }),
    learnData: currentData,
  };
};

const deleteSubLearn = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  currentData[action.index].sublearn.splice(action.index1, 1);
  return {
    ...state,
    learnData: currentData,
  };
};

const addQuestionnaire = (state, action) => {
  console.log(action.data);
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  let questionnaires = currentData[action.index].sublearn[
    action.index1
  ].questionnaire.map((a) => {
    return { ...a };
  });
  currentData[action.index].sublearn[action.index1].questionnaire = [
    ...questionnaires,
    ...action.data,
  ];
  return {
    ...state,
    learnData: currentData,
  };
};

const editQuestionnaire = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  if (action.editType === "question") {
    currentData[action.index].sublearn[action.index1].questionnaire[
      action.index2
    ].question = action.data;
  } else {
    currentData[action.index].sublearn[action.index1].questionnaire[
      action.index2
    ].answer = action.data;
  }
  return {
    ...state,
    // learnData: currentData.map((data) => {
    //   if (data._id === action.mainId) {
    //     data.sublearn.map((data1) => {
    //       if (data1._id === action.subId) {
    //         data1.questionnaire.map((data2) => {
    //           if (data2._id === action.id) {
    //             console.log(action.editType);
    //             if (action.editType === "question") {
    //               data2.question = action.data;
    //             } else {
    //               data2.answer = action.data;
    //             }
    //           }
    //           return data2;
    //         });
    //       }
    //       return data1;
    //     });
    //   }
    //   return data;
    // }),
    learnData: currentData,
  };
};

const deleteQuestionnaire = (state, action) => {
  let currentData = state.learnData.map((a) => {
    return { ...a };
  });
  currentData[action.index].sublearn[action.index1].questionnaire.splice(
    action.index2,
    1
  );
  return {
    ...state,
    learnData: currentData,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LEARN:
      return addLearn(state, action);
    case actionTypes.GET_LEARN:
      return get(state, action);
    case actionTypes.EDIT_LEARN:
      return editLearn(state, action);
    case actionTypes.DELETE_LEARN:
      return deleteLearn(state, action);
    case actionTypes.ADD_SUB_LEARN:
      return addSubLearn(state, action);
    case actionTypes.EDIT_SUB_LEARN:
      return editSubLearn(state, action);
    case actionTypes.DELETE_SUB_LEARN:
      return deleteSubLearn(state, action);
    case actionTypes.ADD_QUESTIONNAIRE:
      return addQuestionnaire(state, action);
    case actionTypes.EDIT_QUESTIONNAIRE:
      return editQuestionnaire(state, action);
    case actionTypes.DELETE_QUESTIONNAIRE:
      return deleteQuestionnaire(state, action);
    default:
      return state;
  }
};

export default reducer;
