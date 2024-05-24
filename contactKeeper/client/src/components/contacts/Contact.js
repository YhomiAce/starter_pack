import React,{useContext,Fragment,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from "./ContactItem";
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Spinner from '../layouts/Spinner';

const Contacts = (props) => {
  const contactContext = useContext(ContactContext);
  const {contacts,filter,getContacts,loading} = contactContext;
  useEffect(()=>{
    getContacts();
    // eslint-disable-next-line
  },[]);

  if(contacts !== null &&contacts.length === 0 && !loading ){
    return <h3>Please add a Contact</h3>
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (

          <TransitionGroup>
            { filter !== null ?
              filter.map(contact=>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                 <ContactItem contact={contact} />
                </CSSTransition>
              ))
              :
              contacts.map(contact=>(
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            }
          </TransitionGroup>

      ) : (<Spinner />)}

    </Fragment>
  )
}

export default Contacts
