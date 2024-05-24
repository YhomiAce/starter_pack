import React,{useReducer} from 'react';
import * as actionTypes from '../actionTypes';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';

const ContactState = props =>{
  const initialState = {
    contacts:null,
    current:null,
    filter:null,
    error:null,
    loading:true
  };

  const [state,dispatch] = useReducer(ContactReducer,initialState);

  //Actions: Add contact
  const addContact = async(contact)=>{
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    try {
      const result = await axios.post('/api/contact',contact,config);
      dispatch({type:actionTypes.ADD_CONTACT,payload:result.data});
    } catch (err) {
      dispatch({type:actionTypes.CONTACT_ERROR,payload:err.response.msg});
    }

  }

  // Actions: Get contacts
  const getContacts = async()=>{
    try {
      const result = await axios.get('/api/contact');
      dispatch({type:actionTypes.GET_CONTACTS,payload:result.data})

    } catch (err) {
      dispatch({type:actionTypes.CONTACT_ERROR,payload:err.response.msg})
    }

  }

  //Actions: Delete contact
  const deleteContact = async(id)=>{
    try {
       await axios.delete(`/api/contact/${id}`);
      dispatch({type:actionTypes.DELETE_CONTACT,payload:id})
    } catch (err) {
      dispatch({type:actionTypes.CONTACT_ERROR,payload:err.response.msg});
    }

  }

  //Actions: Update contact
  const updateContact = async(contact)=>{
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    try {
      const result = await axios.patch(`/api/contact/${contact._id}`,contact,config);
       dispatch({type:actionTypes.UPDATE_CONTACT,payload:result.data});
       getContacts();
    } catch (err) {
      dispatch({type:actionTypes.CONTACT_ERROR,payload:err.response.msg});
    }

  }

  // clear contacts
  const clearContacts = ()=>{
    dispatch({type:actionTypes.CLEAR_CONTACTS});
  }

  //Actions: Set current contact
  const setCurrent = contact=>{
    dispatch({type:actionTypes.SET_CURRENT,payload:contact})
  }

  //Actions: Clear current contact
  const clearCurrent = ()=>{
    dispatch({type:actionTypes.CLEAR_CURRENT})
  }

  //Actions: Filter contact
  const filterContact = text =>{
    dispatch({type:actionTypes.FILTER_CONTACT,payload:text});
  }

  //Actions: Clear Filter
  const clearFilter = ()=>{
    dispatch({type:actionTypes.CLEAR_FILTER});
  }

  return (
    <ContactContext.Provider value={
        {
          contacts:state.contacts,
          current:state.current,
          error:state.error,
          loading:state.loading,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filter:state.filter,
          filterContact,
          clearFilter,
          getContacts,
          clearContacts
        }
      }>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;
