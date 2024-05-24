import React,{useReducer} from 'react';
import * as actionTypes from '../actionTypes';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import {v4 as  uuid} from 'uuid';

const AlertState = props =>{
  const initialState = [];

  const [state,dispatch] = useReducer(AlertReducer, initialState);

  // Set alert
  const setAlert = (msg,type)=>{
    const id =uuid();
    dispatch({type:actionTypes.SET_ALERT,payload:{msg,type,id}});
    setTimeout(function () {
      dispatch({type:actionTypes.REMOVE_ALERT,payload:id})
    }, 5000);
  }

  return(
    <AlertContext.Provider value={
        {
          alerts:state,
          setAlert
        }
      }>
      {props.children}
    </AlertContext.Provider>
  )
}
export default AlertState;
