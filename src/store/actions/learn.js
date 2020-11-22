import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
// export const update = (data, section) => {
//   console.log("update actioncreator", dataValue, section);
//   return (dispatch) => {
//     return Axios.post("/Banner/update", data)
//       .then((result) => {
//         console.log("result update", result);
//         dispatch({
//           type: actionTypes.UPDATE_BANNER,
//           section,
//           data: data,
//         });
//         return result.data.message;
//       })
//       .catch((err) => {
//         console.log(err);
//         return Promise.reject(ERROR_MESSAGE);
//       });
//   };
// };

// export const deletee = (id, section) => {
//   //   console.log("update actioncreator", dataValue, section);
//   return (dispatch) => {
//     return Axios.post("/Banner/delete", { _id: id })
//       .then((result) => {
//         console.log("result update", result);
//         dispatch({
//           type: actionTypes.DELETE_BANNER,
//           section,
//         });
//         return result.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         return Promise.reject(ERROR_MESSAGE);
//       });
//   };
// };

export const get = () => {
  console.log("Learn get action creator");
  return (dispatch) => {
    return Axios.get("/Learn/getLearn")
      .then((result) => {
        console.log("Result", result);
        dispatch({
          type: actionTypes.GET_LEARN,
          data: result.data.data,
        });
        return result.data;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addLearn = (title) => {
  return async (dispatch) => {
    return Axios.post("/Learn/addLearn", {
      title,
    })
      .then(async (result) => {
        await dispatch({
          type: actionTypes.ADD_LEARN,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editLearn = (_id, title, index) => {
  console.log("Reached", index);
  return (dispatch) => {
    return Axios.post("/Learn/editLearn", {
      _id,
      title,
    })
      .then((result) => {
        console.log("Result", result.data.message);
        dispatch({
          type: actionTypes.EDIT_LEARN,
          _id,
          title,
          index,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteLearn = (_id, index) => {
  return (dispatch) => {
    return Axios.post("/Learn/deleteLearn", {
      _id,
    })
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_LEARN,
          index,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addSubLearn = (_id, subTitle, content, questionnaire, index) => {
  return async (dispatch) => {
    return Axios.post("/Learn/addSubLearn", {
      _id,
      questionnaire,
      subTitle,
      content,
    })
      .then(async (result) => {
        await dispatch({
          type: actionTypes.ADD_SUB_LEARN,
          index,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject("Question was Empty");
      });
  };
};

export const editSubLearn = (mainId, subId, data, type, index, index1) => {
  console.log("Reached");
  return (dispatch) => {
    return Axios.post("/Learn/editSubLearn", {
      _id: subId,
      data,
      type,
    })
      .then((result) => {
        console.log("Result", result.data.message);
        dispatch({
          type: actionTypes.EDIT_SUB_LEARN,
          mainId,
          subId,
          data,
          editType: type,
          index,
          index1,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteSubLearn = (_id, __id, index, index1) => {
  return (dispatch) => {
    return Axios.post("/Learn/deleteSubLearn", {
      _id,
      __id,
    })
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_SUB_LEARN,
          index,
          index1,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addQuestionnaire = (subId, questionnaire, index, index1) => {
  console.log(questionnaire);
  console.log("Reached Questionnaire");
  return (dispatch) => {
    return Axios.post("/Learn/addQuestionnaire", {
      _id: subId,
      questionnaire,
    })
      .then((result) => {
        console.log("Result", result.data.message);
        dispatch({
          type: actionTypes.ADD_QUESTIONNAIRE,
          data: result.data.data,
          index,
          index1,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject("Question was Empty");
      });
  };
};

export const editQuestionnaire = (
  mainId,
  subId,
  id,
  data,
  type,
  index,
  index1,
  index2
) => {
  console.log("Reached Questionnaire");
  return (dispatch) => {
    return Axios.post("/Learn/editQuestionnaire", {
      _id: id,
      data,
      type,
    })
      .then((result) => {
        console.log("Result", result.data.message);
        dispatch({
          type: actionTypes.EDIT_QUESTIONNAIRE,
          mainId,
          subId,
          id,
          data,
          editType: type,
          index,
          index1,
          index2,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteQuestionnaire = (_id, __id, index, index1, index2) => {
  return (dispatch) => {
    return Axios.post("/Learn/deleteQuestionnaire", {
      _id,
      __id,
    })
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_QUESTIONNAIRE,
          index,
          index1,
          index2,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
