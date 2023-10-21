import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Component/Home';
import Categories from '../Component/Categories';
import ProductDetails from '../Component/ProductDetails';
import CategoriesDetails from '../Component/CategoriesDetails';
import Whishlist from '../Component/Whishlist';
import Cart from '../Component/Cart';
import BillingDetails from '../Component/BillingDetails';


const PrivateRoutes = ({ filterValue, setSelectedProducts, selectedProducts, selectedCartItems, setSelectedCartItems ,cartDetails
  ,setCartDetails,notFound: NotFound, user  , userId}) => {
  return (
    <Routes>
      <Route path="/" element={<Home filterValue={filterValue}  />} />
      <Route
        path="/categories"
        element={
          <Categories
            filterValue={filterValue}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
            user={user}
          />
        }
      />
      <Route
        path="/product-detail/:productId"
        element={
          <ProductDetails
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
            user={user}
          />
        }
      />
      <Route
        path="/categories-detail/:productName"
        element={
          <CategoriesDetails
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
            user={user}
            userId={userId}
          />
        }
      />
      <Route
        path="/whishlist"
        element={
          <Whishlist
            filterValue={filterValue}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
           
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            filterValue={filterValue}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
            cartDetails = {cartDetails}
            setCartDetails = {setCartDetails}
 
          />
        }
      />
      <Route path="/billingDetails" element={<BillingDetails
       cartDetails = {cartDetails}
       setCartDetails = {setCartDetails} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
};

export default PrivateRoutes;
