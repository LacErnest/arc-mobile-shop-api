import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../action/types";

const initialState = {
  items: [],
  loading: false
}

export default function(state=initialState, action){
  switch(action.type){
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id!==action.payload)
      }

    case UPDATE_ITEM:
      const {id, data} = action.payload
      return {
        ...state, 
        items: state.items.map(item => {   //[a,b,c,d]  z  => [a,z,c,d]
          if (item._id === id){ 
              item = data
          }
        })
      }
    
      case ITEMS_LOADING:
        return {
          ...state, 
          loading: true
        }
      
      default:
        return state
  }
}