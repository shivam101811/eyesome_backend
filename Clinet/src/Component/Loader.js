import React from 'react'
import "../assets/index.css"
import loaderImg from '../assets/images/loader/loader.gif';
const Loader = () => {
  return (
    <div className="loader-container">
    <img
      src={loaderImg} // **animation loader** 
      alt="Loading..."
    />
  </div>
  )
}

export default Loader