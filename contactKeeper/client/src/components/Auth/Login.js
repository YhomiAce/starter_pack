import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';


const Login = (props) => {
  const [user,setUser] = useState({
    email:'',
    password:''
  });

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const {login,isAuthenticated,error,clearError} = authContext;
  const {setAlert} = alertContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/');
    }
    if (error !== null) {
      setAlert(error, 'danger');
      clearError();
    }
    // eslint-disable-next-line
  },[error,isAuthenticated,props.history])

  const {email,password} = user;

  const changehandler = e =>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const submitHandler = e =>{
    e.preventDefault();
    if(email === '' || password === ''){
      setAlert('Please Enter all field','danger')
    }else if (password.length < 5 ) {
      setAlert('Password length must be atleast 5 characters','danger');
    }else{
      login({email,password})
    }

  }
  return (
    <div className="form-container">
      <h1>Account <span className="text-success">Login</span></h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} name="email" onChange={changehandler}  />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" value={password} name="password" onChange={changehandler}  />
        </div>

        <input type="submit" value="Login" className="btn btn-success btn-block" />
      </form>
    </div>
  )
}

export default Login
