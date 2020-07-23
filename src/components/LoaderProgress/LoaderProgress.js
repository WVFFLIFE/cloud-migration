import React from 'react';

import './index.css'

const LoaderProgress = ({
  status = 'loading'
}) => {  
  return (
    <div className={`loader ${status}`}>
      <svg className="spinner" width="28px" height="28px" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="#fff" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20"></circle>
      </svg>
    </div>
  )
}

export default LoaderProgress;