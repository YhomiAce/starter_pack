import React,{useContext,useEffect} from 'react';
import Contacts from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/contactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = (props) => {
  const authContext = useContext(AuthContext);
  useEffect(()=>{
    authContext.loadUser();
    // eslint-disable-next-line
  },[]);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
