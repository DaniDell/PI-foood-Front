import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const GET_NAME = 'GET_NAME';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_DIETS = 'GET_DIETS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const SET_PAGE = 'SET_PAGE';

export function getRecipes() {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('/recipes');
      const recetas = apiData.data;
      dispatch({
        type: GET_RECIPES,
        payload: recetas,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export const getDiets = (diets) => ({
  type: GET_DIETS,
  payload: diets,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export function filterRecipesByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipes?name=${name}`);
      dispatch({
        type: GET_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log('you need to complete the input');
    }
  };
}

export function searchByName(name) {
  return {
    type: SEARCH_BY_NAME,
    payload: name,
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/recipe`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
