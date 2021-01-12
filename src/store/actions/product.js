import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const getAttribute = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/products/getAttribute`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_ATTRIBUTES,
          data: result.data.attribute,
        });
        return `Attributes Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addAttribute = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/products/add-attribute`, data)
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_ATTRIBUTE,
          data: result.data.test,
        });
        return `Attribute Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editAttribute = (data, id) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/products/attribute-data/${id}`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_ATTRIBUTE,
          data: result.data.attribute,
        });
        return `Attribute Edited Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteAttribute = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/products/attribute-delete/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_ATTRIBUTE,
          data: id,
        });
        return `Attribute Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getProducts = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/products/allProducts`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.GET_PRODUCTS,
          data: result.data.products,
        });
        return `Products Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    console.log(data);
    return Axios.post(`${BACK_END_URL}/products/add-product`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.ADD_PRODUCT,
          data: result.data.productmeta,
        });
        return `Product Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editProduct = (data, id) => {
  return (dispatch) => {
    console.log(data);
    return Axios.post(`${BACK_END_URL}/products/edit/${id}`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_PRODUCT,
          data: result.data.data,
        });
        return {
          data: result.data.data,
          message: `Product Updated Successfully`,
          product: result.data.product,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/products/delete/${id}`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.DELETE_PRODUCT,
          data: id,
        });
        return `Product Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err.message);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const removeProductImage = (data, type) => {
  return (dispatch) => {
    let url;
    if (type === `product`) {
      url = `${BACK_END_URL}/products/removeimage`;
    } else {
      url = `${BACK_END_URL}/products/removebimage`;
    }
    return Axios.post(url, data)
      .then((result) => {
        return {
          message: `Image Deleted Successfully`,
          data: result.data.data,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getCombos = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/products/combos/getAll`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.GET_COMBOS,
          data: result.data.combos,
        });
        return `Combos Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addCombo = (data) => {
  return (dispatch) => {
    console.log(data);
    return Axios.post(`${BACK_END_URL}/products/combos/add`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.ADD_COMBO,
          data: result.data.combo,
        });
        return `Combo Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editCombo = (data, id) => {
  return (dispatch) => {
    console.log(data);
    return Axios.post(`${BACK_END_URL}/products/combos/edit/${id}`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_COMBO,
          data: result.data.combo,
        });
        return {
          data: result.data.combo,
          message: `Combo Updated Successfully`,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteCombo = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/products/combos/delete/${id}`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.DELETE_COMBO,
          data: id,
        });
        return `Combo Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err.message);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const removeComboImage = (data, type) => {
  return (dispatch) => {
    let url;
    if (type === `product`) {
      url = `${BACK_END_URL}/products/combos/removeimage`;
    } else {
      url = `${BACK_END_URL}/products/combos/removebimage`;
    }
    return Axios.post(url, data)
      .then((result) => {
        return {
          message: `Image Deleted Successfully`,
          data: result.data.data,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
