import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const basePrice = 80; 

const initialState = {
  ingredients: null,
  totalPrice: basePrice,
  error: false,
  basePrice
};

const INGREDIENT_PRICES = {
  salad: 15.25,
  cheese: 13.50,
  bacon: 28.70,
  meat: 36.63
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.ADD_INGREDIENT:
      const addUpdatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
      const addUpdatedIngs = updateObject(state.ingredients, addUpdatedIng);
      const addUpdatedState = {
        ingredients: addUpdatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, addUpdatedState);

    case actionTypes.REMOVE_INGREDIENT:
      const subUpdatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
      const subUpdatedIngs = updateObject(state.ingredients, subUpdatedIng);
      const subUpdatedState = {
        ingredients: subUpdatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, subUpdatedState);

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: basePrice
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

// direct way without utility function

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
//     case actionTypes.ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: {
//           ...state.ingredients,
//           [action.ingredientName]: state.ingredients[action.ingredientName] + 1
//         },
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//       };
//     case actionTypes.REMOVE_INGREDIENT:
//       return {
//         ...state,
//         ingredients: {
//           ...state.ingredients,
//           [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//         },
//         totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
//       };
//     case actionTypes.SET_INGREDIENTS:
//       return {
//         ...state,
//         ingredients: {
//           salad: action.ingredients.salad,
//           bacon: action.ingredients.bacon,
//           cheese: action.ingredients.cheese,
//           meat: action.ingredients.meat
//         },
//         error: false,
//         totalPrice: basePrice
//       };
//     case actionTypes.FETCH_INGREDIENTS_FAILED:
//       return {
//         ...state,
//         error: true
//       };
//     default:
//       return state;
//   }
// };

export default reducer;