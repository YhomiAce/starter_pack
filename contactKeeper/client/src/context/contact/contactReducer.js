import * as actionTypes from '../actionTypes';

const ContactReducer = (state,action)=>{
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return{
        ...state,
        contacts:[...state.contacts,action.payload],
        loading:false
      }
    case actionTypes.DELETE_CONTACT:
      return{
        ...state,
        contacts:state.contacts.filter(contact=>contact._id !== action.payload),
        loading:false
      }
    case actionTypes.SET_CURRENT:
      return{
        ...state,
        current:action.payload
      }
    case actionTypes.CLEAR_CURRENT:
      return {
        ...state,
        current:null
      }
    case actionTypes.UPDATE_CONTACT:
      return{
        ...state,
        contacts:state.contacts.map(contact=> contact._id === action.payload._id ? action.payload : contact),
        loading:false
      }
    case actionTypes.FILTER_CONTACT:
      return{
        ...state,
        filter:state.contacts.filter(contact=>{
          const regex = new RegExp(`${action.payload}`,'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
    case actionTypes.CLEAR_FILTER:
      return{
        ...state,
        filter:null
      }
    case actionTypes.CONTACT_ERROR:
      return{
        ...state,
        error:action.payload
      }
    case actionTypes.GET_CONTACTS:
      return{
        ...state,
        contacts:action.payload,
        loading:false
      }
    case actionTypes.CLEAR_CONTACTS:
      return{
        ...state,
        loading:false,
        contacts:null,
        current:null,
        filter:null,
        error:null
      }
    default: return  state;

  }
}

export default ContactReducer;
