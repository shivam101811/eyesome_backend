import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Categories from '../Data/Categories.json';
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-toastify';


function CategoriesDetails({ selectedProducts, setSelectedProducts, selectedCartItems, setSelectedCartItems, user ,userId}) {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [isLoading, setIsLoading] = useState(true);


  const [eyeproducts, setEyeProducts] = useState([]);
  useEffect(() => {
    // Fetch data from your MongoDB using Axios
    axios.get("http://localhost:8000/api/product/getAllProduct")
      .then(response => {
        
        setEyeProducts(response.data.results);
        console.log(eyeproducts, "this is eyeproduct data")
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        console.error('Error fetching data:', error);
      });
  }, []);

  const { productName } = useParams();
  const product = eyeproducts.find(p => p.name === productName);
  console.log(product, "<------ this is data")
  console.log(user, "<----- this is user")



  // whislist button function
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
    // Create the cart item object
    const cartItem = {
      productID: product._id, // Use the actual product ID from the selected product
      quantity: 1, // You can set the initial quantity here
    };
  
    console.log(userId, "<-------------------");
    // Make an Axios POST request to add the product to the cart
    axios.post('http://localhost:8000/api/cart/createCart', {
      userID: userId, // Use the actual user ID from your application
      products: [cartItem], // Pass the cart item as an array
    })
    .then(response => {
      // Handle the success response from the server
      console.log('Product added to cart:', response.data);
      // You can update the state or show a success message here
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error adding product to cart:', error);
      // You can update the state or show an error message here
    });
  };
  
  

  return (
    <div className="wrapper">
      {
        isLoading ? 

        <Loader/>

        :
        <div className="a_i_p_container">
        <div className="inner_a_i_p_container">
          <div className="a_i_p_box1">
            <img src={product.image} alt="" />
          </div>
          <div className="a_i_p_box2">
            <h1 className="a_i_p_heading">{product.name}</h1>
            <p className="a_i_p_text1"  title={product.desc} >
              {product?.desc?.slice(0 , 200) + " ... "}
            </p>
            <label htmlFor="" className="a_i_p_rating">
              <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
              <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
              <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
              <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
              <i className="fa-solid fa-star" style={{ color: "#d4ff00" }} />
              {`(${product.rating})`} Rating
            </label>
            <div className="a_i_p_aboutproduct">
              <h3 className="a_i_p_heading2">About Product</h3>
              <div className="a_i_p_container">
                <span>
                  <label htmlFor="">
                    Brand: <span>{product.brand}</span>
                  </label>
                  <label htmlFor="">
                    Category: <span>{product.categoryName}</span>
                  </label>
                </span>
                <span>
                  <label htmlFor="">
                    Gender:<span>{product.gender}</span>
                  </label>
                  <label htmlFor="">
                    Heavy: <span>{product.weight}</span>
                  </label>
                </span>
              </div>
            </div>
            <div className="a_i_p_price">
              Price:
              <label htmlFor="">₹{Math.floor(product.price - (product.price * product.descPercentage / 100))}</label>
              <span>₹{product.price}</span>
            </div>
            <div className="a_i_p_btn">
              <a className={`a_i_p_btn1 ${selectedCartItems.includes(product.name) ? 'change-in-color1' : ''
                }`} onClick={() => handleAddToCart(product)} >
                <i className="fa-solid fa-cart-shopping" /> {selectedCartItems.includes(product.name) ? 'Remove from bag ' : 'Add to Bag'}
              </a>
              <a
                className={`a_i_p_btn2 ${selectedProducts.includes(product.name) ? 'whishlist-btn' : ''}`}
                onClick={handleWishlistClick}
              >
                <i className="fa-solid fa-bookmark"></i> Wishlist Item
              </a>
            </div>
          </div>
        </div>
      </div>

      }
     
    </div>

  )
}

export default CategoriesDetails