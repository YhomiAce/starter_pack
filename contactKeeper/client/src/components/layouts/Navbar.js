import React,{Fragment,useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = props =>{
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const {clearContacts} = contactContext;
  const {isAuthenticated,user,logout} = authContext;
  const onLogout = ()=>{
    logout();
    clearContacts();
  }
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/" >Hello {user ? user.name : null}</Link>
      </li>
        <li>
          <Link to="/about" >About</Link>
        </li>
      <li>
        {/* eslint-disable-next-line */}
        <a href="#" onClick={onLogout}><i  className="fas fa-sign-out-alt"/><span className="hide-sm"></span>Logout</a>
    </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/about" >About</Link>
      </li>
      <li>
        <Link to="/register" >Sign Up</Link>
      </li>
      <li>
        <Link to="/login" >Sign In</Link>
      </li>
    </Fragment>
  )
  return(
    <div className="navbar bg-primary">
      <h1>
        <i className="fas fa-id-card-alt" /> ContactManager
      </h1>
      <ul>
        {
          isAuthenticated ? authLinks : guestLinks
        }
      </ul>
    </div>
  )
}

export default Navbar;
