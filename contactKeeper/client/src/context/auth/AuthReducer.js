import * as actionTypes from '../actionTypes';

const AuthReducer = (state,action)=>{
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    localStorage.setItem('token',action.payload.token);
      return{
        ...state,
        ...action.payload,
        isAuthenticated:true,
        loading:false
      }
    case actionTypes.REGISTER_FAIL:
      localStorage.removeItem('token');
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        error:action.payload
      }
    case actionTypes.CLEAR_ERROR:
      return{
        ...state,
        error:null
      }
    case actionTypes.USER_LOADED:
      return{
        ...state,
        isAuthenticated:true,
        loading:false,
        user:action.payload
      }
    case actionTypes.AUTH_ERROR:
      localStorage.removeItem('token');
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        error:null
      }
    case actionTypes.LOGIN_SUCCESS:
    localStorage.setItem('token',action.payload.token);
      return{
        ...state,
        ...action.payload,
        isAuthenticated:true,
        loading:false
      }
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem('token');
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        error:action.payload
      }
    case actionTypes.LOGOUT:
      localStorage.removeItem('token');
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        error:null
      }
    default:return state;

  }
}

export default AuthReducer;
