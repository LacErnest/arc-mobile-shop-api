import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from "../action/types";

const initialState = {
  orders: [],
  loading: false
}

export default function(state=initialState, action){
  switch(action.type){
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }

    case CHECKOUT:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }

    case ORDERS_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}