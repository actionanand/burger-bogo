import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};


const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const updateLoadingState = (state, loading=true) => {
  return updateObject(state, { loading });
};

const reducer = (state=initialState, action) => {
  switch(action.type) {

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
      
    case actionTypes.PURCHASE_BURGER_START: return updateLoadingState(state);
      
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL: return updateLoadingState(state, false);
      
    case actionTypes.FETCH_ORDER_START: return updateLoadingState(state);
      
    case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDER_FAIL: return updateLoadingState(state, false);

    default: return state;
  }
};


// direct way without utility function

// const reducer = (state=initialState, action) => {
//   switch(action.type) {
//     case actionTypes.PURCHASE_INIT:
//       return {
//         ...state,
//         purchased: false
//       };
//     case actionTypes.PURCHASE_BURGER_START:
//       return {
//         ...state,
//         loading: true
//       };
//     case actionTypes.PURCHASE_BURGER_SUCCESS:
//       const newOrder = {
//         ...action.orderData,
//         id: action.orderId,
//       };
//       return {
//         ...state,
//         loading: false,
//         orders: state.orders.concat(newOrder),
//         purchased: true
//       };
//     case actionTypes.PURCHASE_BURGER_FAIL:
//       return {
//         ...state,
//         loading: false
//       };
//     case actionTypes.FETCH_ORDER_START:
//       return {
//         ...state,
//         loading: true
//       };
//     case actionTypes.FETCH_ORDER_SUCCESS:
//       return {
//         ...state,
//         orders: action.orders,
//         loading: false
//       };
//     case actionTypes.FETCH_ORDER_FAIL:
//       return {
//         ...state,
//         loading: false
//       };
//     default:
//       return state;
//   }
// };

export default reducer;