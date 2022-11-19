import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const basePrice = 80; 
const maxAllowedIng = 3;

const initialState = {
  ingredients: null,
  totalPrice: basePrice,
  error: false,
  basePrice,
  maxAllowedIng,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 15.25,
  cheese: 13.50,
  bacon: 28.70,
  meat: 36.63
};


const addRemoveIngs = (state, action, isAdd=true) => {
  const updatedIng = isAdd ? 
    {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} :
    {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};

  const updatedIngs = updateObject(state.ingredients, updatedIng);

  const totalPrice = isAdd ? 
    state.totalPrice + INGREDIENT_PRICES[action.ingredientName] :
    state.totalPrice - INGREDIENT_PRICES[action.ingredientName];

  const updatedState = {
    ingredients: updatedIngs,
    totalPrice,
    building: true
  };

  return updateObject(state, updatedState);
}

const setIngs = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    error: false,
    totalPrice: basePrice,
    building: false
  });
};


const reducer = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.ADD_INGREDIENT: return addRemoveIngs(state, action);
      
    case actionTypes.REMOVE_INGREDIENT: return addRemoveIngs(state, action, false);

    case actionTypes.SET_INGREDIENTS: return setIngs(state, action);
 
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default: return state;
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