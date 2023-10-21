import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import PrivateRoutes from './Routes/PrivateRoutes';
import NotFound from './Component/NotFound';
import Login from './Component/Login';
import SignUp from './Component/SignUp';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  // const [userData, setUserData] = useState([]); // State to store user data
  const [user, setUser] = useState(null);
  const [ userId ,setUserId] = useState(null);


  const handleLogin = (userData) => {
    let {username}= userData
    // Assuming your user data contains the name property
    setUser(username); // Here, you're using 'name' as the key
  }; 
  // useEffect(()=>{console.log("this is user", user)}, [user])
  






  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // const handleSignUp = (newUserData) => {
  //   setUserData([...userData, newUserData]);
  //   setUser(newUserData); // Set the user state with the new user's data
  //   // You can save userData to local storage or send it to a server
  // }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} onLogin={handleLogin} setUserId={setUserId} />} />
        <Route path="/signup" element={<SignUp  />} />

        {/* Route where the Header component is displayed */}
        <Route path="/*" element={
          <>
            <Header 
              onFilterChange={handleFilterChange}
              selectedProducts={selectedProducts}
              selectedCartItems={selectedCartItems}
              user={user}
            />
            <PrivateRoutes
              filterValue={filterValue}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              selectedCartItems={selectedCartItems}
              setSelectedCartItems={setSelectedCartItems}
              cartDetails={cartDetails}
              setCartDetails={setCartDetails}
              notFound={NotFound}
              user={user}
              userId={userId}
            />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
