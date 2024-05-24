import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';



const Register = (props) => {
  const [user,setUser] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const authContext = useContext(AuthContext);
  const {register,error,clearError,isAuthenticated} = authContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }
    if(error !== null){
      setAlert(error,'danger')
      clearError();
    }
    // eslint-disable-next-line
  },[error,isAuthenticated,props.history])


  const {name,email,password,password2} = user;

  const changehandler = e =>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const submitHandler = e =>{
    e.preventDefault();
    if(name === '' || email === '' || password === '' || password2 === ''){
      setAlert('Please Enter all field','danger')
    }else if (password.length < 5 ) {
      setAlert('Password length must be atleast 5 characters','danger');
    }else if (password !== password2) {
      setAlert('Passwords do not match','danger');
    }else{
      register({
        name,
        email,
        password
      });
    }
  }
  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Register</span></h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={changehandler} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} name="email" onChange={changehandler} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" value={password} name="password" onChange={changehandler} required minLength="5" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" value={password2} name="password2" onChange={changehandler} required minLength="5" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register
