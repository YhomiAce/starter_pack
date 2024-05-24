import React,{useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({contact}) => {
  const {_id,name,email,phone,type} = contact;
  const contactContext = useContext(ContactContext);
  const {deleteContact,setCurrent,clearCurrent} = contactContext;

  const deleteHandler = (id)=>{
    deleteContact(id);
    clearCurrent();
  }

  const editHandler = (currentContact)=>{
    setCurrent(currentContact);
  }
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
          {name} {' '} <span style={{float:'right'}}
          className={'badge ' + (type === 'professional' ? "badge-success" : "badge-primary")}>
          {type.charAt(0).toUpperCase()+ type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email ? (<li>
          <i className="fas fa-envelope-open" /> {email}
        </li>) :null}
        {phone ? (<li>
          <i className="fas fa-phone" /> {phone}
        </li>) :null}
      </ul>
      <p>
        <button className="btn btn-dark" onClick={()=>editHandler(contact)}>Edit</button>
        <button className="btn btn-danger" onClick={()=>deleteHandler(_id)}>Delete</button>
      </p>
    </div>
  )
}

export default ContactItem;
