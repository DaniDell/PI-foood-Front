import {
  GET_RECIPES,
  FILTER_BY_TYPE,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_DETAILS,
  GET_NAME,
  SEARCH_BY_NAME,
} from "../actions/actions";

const initialState = {
  recipes: [],
  recetasTotal: [],
  detail: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        recetasTotal: payload,
      };

    case FILTER_BY_TYPE:
      if (payload === "All") {
        return {
          ...state,
          recetasTotal: state.recipes,
        };
      }
      return {
        ...state,
        recetasTotal: state.recipes.filter((e) => e.diets.includes(payload)),
      };

    case ORDER_BY_NAME:
      let sortedArr =
        payload === "asc"
          ? [...state.recetasTotal].sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : [...state.recetasTotal].sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recetasTotal: sortedArr,
      };

    case ORDER_BY_SCORE:
      let scoreArr =
        payload === "mas"
          ? [...state.recetasTotal].sort(function (a, b) {
              if (a.healthScore > b.healthScore) return -1;
              if (a.healthScore < b.healthScore) return 1;
              return 0;
            })
          : [...state.recetasTotal].sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        recetasTotal: scoreArr,
      };
      
    case GET_DETAILS:
      return {
        ...state,
        detail: payload,
      };

      case GET_NAME:
        return {
          ...state,
          recetasTotal: state.recipes.filter(
            (recipe) =>
              recipe.name.toLowerCase().includes(payload) ||
              recipe.name.toLowerCase().startsWith(payload) ||
              recipe.name.toLowerCase().endsWith(payload)
          ),
        };
      

    case SEARCH_BY_NAME:
      const searchTerm = payload.toLowerCase();
      const filteredByName = state.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        recetasTotal: filteredByName,
      };
    default:
      return state;
  }
}
export default rootReducer;
