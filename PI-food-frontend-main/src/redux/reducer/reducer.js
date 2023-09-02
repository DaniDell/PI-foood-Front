import {
  GET_RECIPES,
  FILTER_BY_TYPE,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_NAME,
  SEARCH_BY_NAME,
  RESET_FILTERS,
  SET_PAGE
} from "../actions/actions";

const initialState = {
  recipes: [],
  filterRecipes: [],
  currentPage: 1,
  selectedDietType: "",
  selectedHealthLevel: "",
  selectedAlphabeticalOrder: "",
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        filterRecipes: payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        filterRecipes: state.recipes,
        selectedDietType: "",
        selectedHealthLevel: "",
        selectedAlphabeticalOrder: "",
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    case FILTER_BY_TYPE:
      if (payload === "") {
        return {
          ...state,
          filterRecipes: state.recipes,
          selectedDietType: "",
        };
      }
      return {
        ...state,
        filterRecipes: state.recipes.filter((e) => e.diets.includes(payload)),
        selectedDietType: payload,
        selectedHealthLevel: "",
        selectedAlphabeticalOrder: "",
      };

    case ORDER_BY_NAME:
      let sortedArr =
        payload === "asc"
          ? [...state.filterRecipes].sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : [...state.filterRecipes].sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        filterRecipes: sortedArr,
        selectedHealthLevel: "",
        selectedAlphabeticalOrder: payload,
      };

    case ORDER_BY_SCORE:
      let scoreArr =
        payload === "more"
          ? [...state.filterRecipes].sort(function (a, b) {
              if (a.healthScore > b.healthScore) return -1;
              if (a.healthScore < b.healthScore) return 1;
              return 0;
            })
          : [...state.filterRecipes].sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        filterRecipes: scoreArr,
        selectedHealthLevel: payload,
        selectedAlphabeticalOrder: "",
      };

    case GET_NAME:
      return {
        ...state,
        filterRecipes: state.recipes.filter(
          (recipe) =>
            recipe.name.toLowerCase().includes(payload) ||
            recipe.name.toLowerCase().startsWith(payload) ||
            recipe.name.toLowerCase().endsWith(payload)
        ),
        selectedDietType: "",
        selectedHealthLevel: "",
        selectedAlphabeticalOrder: "",
      };

    case SEARCH_BY_NAME:
      const searchTerm = payload.toLowerCase();
      const filteredByName = state.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        filterRecipes: filteredByName,
        selectedDietType: "",
        selectedHealthLevel: "",
        selectedAlphabeticalOrder: "",
      };

    default:
      return state;
  }
}

export default rootReducer;
