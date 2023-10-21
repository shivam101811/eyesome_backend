import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ setUser ,onLogin,setUserId}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormFilled(email !== '' && password !== '');
  }, [email, password]);

  const handleLogin = async(e) => {
    e.preventDefault();
  



    const Logindata = { email, password };
    try {
      const response = await axios.post("http://localhost:8000/api/user/login", Logindata);
      console.log(response.data); // Log the response data

      setUserId(response.data.results[0].isExist[0]._id);
      // console.log("===>", response)
      let data=response.data.results[0].isExist[0].username
      let username =  data.charAt(0).toUpperCase() + data.slice(1); 
      setUser(username);
      // localhost.setItem("token" , response.data.results[0].token )
      console.log(setUser , "well this is our username !")
          // Handle success and navigate to login page
          toast.success(`Welcome ${username}, You Logged In Successfully!`);
          navigate('/');
          
      }
    catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response.data.message);
    } 
  }


  


  const handleGuestLogin = () => {
    // Create default guest user data
    const guestUser = {
      username: 'shivam',
      email: 'pepeshivam8@gmail.com',
      password: '12345',
    };

    // Log in with the guest user data
    onLogin(guestUser);
    toast.success(`Welcome ${guestUser.username}, You Logged In Successfully!`);
    // Navigate to home page
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-inner-container">
          <Link to={"/"} className="login-title">EYESOME</Link>
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="login-heading">Login to your account</h1>
            <div className="login-details">
              <div className="login-info1">
                <label className="login-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-info2">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="button-container">
              <button className={`loggin-btn1 ${isFormFilled ? 'filled' : ''}`} type="submit">
                Login
              </button>
              <button className="loggin-btn2" onClick={handleGuestLogin}>
                Login as a Guest
              </button>
              <Link to={"/signup"} className="new_acc_link">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
