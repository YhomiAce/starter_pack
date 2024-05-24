import React,{useContext,useRef,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactFilter = (props) => {
  const contactContext = useContext(ContactContext);
  const {filterContact,clearFilter,filter} = contactContext;
  const text = useRef('');

  useEffect(()=>{
    if(filter === null){
      text.current.value = '';
    }
    // eslint-disable-next-line 
  },[])

  const filterHandler = (e)=>{
    if(text.current.value !== ''){
      filterContact(e.target.value);
    }else{
      clearFilter();
    }
  }
  return (
    <form>
      <input type="text" ref={text} onChange={filterHandler} placeholder="Filter contacts..." />
    </form>
  )
}

export default ContactFilter
