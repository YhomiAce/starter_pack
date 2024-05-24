import React,{useState,useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactForm = (props) => {
  const contactContext = useContext(ContactContext);
  const {addContact,current,clearCurrent,updateContact} = contactContext;

  useEffect(()=>{
    if(current !== null){
      setContact(current)
      // setButton('Update Contact');
      // setText('Edit Contact');
    }else{
      setContact({
        name:'',
        email:'',
        phone:'',
        type:'personal'
      });
      // setButton('Add Contact');
      // setText('Add Contact');
    }
  },[contactContext,current]);

  // const [button,setButton] = useState('Add Contact');
  // const [text,setText] = useState('Add Contacts');
  const [contact,setContact] = useState({
    name:'',
    email:'',
    phone:'',
    type:'personal'
  });
  const {name,email,phone,type} = contact

  const changehandler = (e)=>{
    setContact({...contact,[e.target.name]:e.target.value})
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    if(current === null){
      addContact(contact);
    }else {
      //update contact
      updateContact(contact);
    }
    //clear form field
      clearAll();
  }

  const clearAll = ()=>{
    clearCurrent();
  }



  return (
    <form onSubmit={submitHandler}>
      <h2 className="text-primary">{current ? "Edit Contact" : "Add Contact"}</h2>
      <input type="text" name="name" placeholder="Enter Name" value={name} onChange={changehandler} required />
      <input type="email" name="email" placeholder="Enter Email" value={email} onChange={changehandler} required />
      <input type="text" name="phone" placeholder="Enter Phone Number" value={phone} onChange={changehandler} required />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={changehandler} /> Personal{' '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={changehandler} /> Professional
      <div>
        <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block" />
      </div>
      <div>
        {current ?
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button> :
            null
        }
      </div>
    </form>
  )
}

export default ContactForm
