import React, { useEffect, useState } from 'react';
import CategoriesData from '../Data/Categories.json'; 
import { Link } from 'react-router-dom';
import img1 from '../assets/images/whishlist/img1.gif'
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-toastify';

function Whishlist({ filterValue, selectedProducts, setSelectedProducts, selectedCartItems, setSelectedCartItems }) {
  const products = selectedProducts || [];
  
  const [eyeproducts, setEyeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {  
      // Fetch data from your MongoDB using Axios
      axios.get("http://localhost:8000/api/product/getAllProduct")
        .then(response => {
          setEyeProducts(response.data.results);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
  }, []);




  // Find the selected products from the data source using their names
  const selectedProductDetails = eyeproducts.filter(product => products.includes(product.name));

  const handleWishlistClick = (product) => {
    if (selectedProducts.includes(product.name)) {
      setSelectedProducts(selectedProducts.filter(name => name !== product.name));
      toast.error(`Regretfully, ${product.name} has been gently taken out of your wishlist. Farewell, old friend`);
    } else {
      setSelectedProducts([...selectedProducts, product.name]);
      toast.success(`${product.name} is now a cherished member of your wishlist, ready to make dreams come true.`);
    }
  };

  // Add to cart
  const handleAddToCart = (product) => {
    if (selectedCartItems.includes(product.name)) {
      setSelectedCartItems(selectedCartItems.filter(name => name !== product.name));
       toast.error(`${product.name} has been liberated from your cart, successfully unburdened!`);
    } else {
      setSelectedCartItems([...selectedCartItems, product.name]);
       toast.success(`Success! ${product.name} has found its way into your cart.`);
    }
  };

  return (
    <div className="wrapper">


{
        isLoading ? 

        <Loader/>

        :
    <div className="wishlist-container">
      {selectedProductDetails.length > 0 ? (
        selectedProductDetails && selectedProductDetails.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      ).map((product) => (
          <div className="s-p-c3-box wishlist-container-box" key={product.id}>
            {/* Render product details here */}
            <div className="s-p-c3-image-box">
              <Link to={`/categories-detail/${product.name}`} className="img-height">
                <img className="s-p-c3-img" src={product.image} alt="product-img" />
              </Link>
            </div>
            <div className="s-p-c3-detailsbox">
              <div className="s-p-c3-details">
                <div className="s-p-c3-details1">
                  <h3 className="s-p-c3-productname">{product.name}</h3>
                  <label htmlFor="">
                    {product.rating}
                    <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
                    <span>Rating</span>
                  </label>
                </div>
                <div className="s-p-c3-details2">
                  <div className="s-p-c3-discounted-price">{product.discountPrice}</div>
                  <div className="s-p-c3-price">{product.price}</div>
                </div>
              </div>
              <div className="s-p-c3-Product-type">{product.type}</div>
              <div className="s-p-c3-buttons">
              <button
                      className={`s-p-c3-addtocart ${
                        selectedCartItems.includes(product.name) ? 'change-in-color' : ''
                      }`}
                      onClick={() => handleAddToCart(product)} 
                    >
                  {selectedCartItems.includes(product.name) ? 'Remove from bag ' : 'Add to Bag'}
                </button>
                <button
                    className={`s-p-c3-save ${selectedProducts.includes(product.name) ? 'red-color' : ''}`}
                    onClick={() => handleWishlistClick(product)}
                  >
                    <i class="fa-solid fa-bookmark"></i>
                  </button>


              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-box">
          <img src={img1} alt="" />
          <h3 className="empty-box-text1">NOTHING TO SHOW!</h3>
          <p className="empty-box-text2">
            Unlock Your Shopping Desires: Fill Your Empty Wishlist
          </p>
        </div>
      )}
    </div>
    }

    </div>
  );
}

export default Whishlist;
