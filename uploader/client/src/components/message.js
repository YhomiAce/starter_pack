import React from 'react';

const message = ({msg}) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>{msg}</strong>
    </div>
  )
}

export default message
