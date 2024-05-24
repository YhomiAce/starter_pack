import React,{Fragment} from 'react';
import spinner from './spinner.gif';

const Spinner = (props) => {
  const spin = {
    width:'200px',
    margin:'auto',
    display:'block',
  }
  return (
    <Fragment>
      <img src={spinner} style={spin} alt="Loading..." />
    </Fragment>
  )
}

export default Spinner;
