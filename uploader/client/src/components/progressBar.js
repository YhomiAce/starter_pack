import React from 'react';

const progress = ({percent}) => {
  return (
    <div className="progress">
        <div className="progress-bar progress-bar-striped bg-success" role="progressbar"
          style={{width:`${percent}%`}} >  </div>
        {percent}%
    </div>
  )
}

export default progress
