import React, { useState, useEffect } from 'react'
import CategoriesData from '../Data/Categories.json'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import nodata from '../assets/images/no-data-found/no-data.gif';
import { useNavigate } from 'react-router-dom';
import loaderImg from '../assets/images/loader/loader.gif';
import Loader from './Loader';
import { toast } from 'react-toastify';


function Categories({ filterValue, setSelectedProducts, selectedProducts, selectedCartItems, setSelectedCartItems, user }) {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const productsAllData = CategoriesData.products;
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 4999]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // radio button
  const [selectedRating, setSelectedRating] = useState(0);
  // filter button
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  const [eyeproducts, setEyeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const resetFilters = () => {
    setSelectedGender('all');
    setSelectedPriceRange([0, 4999]);
    setSelectedCategories([]);
    setSelectedRating(0);
  };

  const toggleFilterBox = () => {
    setIsFilterBoxVisible(!isFilterBoxVisible);
  };

  console.log(isFilterBoxVisible)



  const handleCategoryChange = (category) => {

    // alert(category)
    console.log(selectedCategories);
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };




  //sorting low to high and high to low
  const [selectedSortingOption, setSelectedSortingOption] = useState('sortbyprice');

  const handleSortingChange = (e) => {
    setSelectedSortingOption(e.target.value);
  };




  // default check  page of vision sunglasses and sports
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('selectedCategory');

  useEffect(() => {

    console.log("use effect");

    console.log(selectedCategories);
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    }
  }, [selectedCategory]);






  // transfer data to Whishlist.




  const handleWishlistClick = (product) => {
    if (selectedProducts.includes(product.name)) {
      setSelectedProducts(selectedProducts.filter(name => name !== product.name));
      toast.error(`Regretfully, ${product.name} has been gently taken out of your wishlist. Farewell, old friend`);
    } else {
      setSelectedProducts([...selectedProducts, product.name]);
      toast.success(`${product.name} is now a cherished member of your wishlist, ready to make dreams come true.`);
    }
  };




  const handleAddToCart = (product) => {
    console.log(product);
    if (selectedCartItems.includes(product.name)) {
      setSelectedCartItems(selectedCartItems.filter((name) => name !== product.name));
      toast.error(`${product.name} has been liberated from your cart, successfully unburdened!`);
    } else {
      setSelectedCartItems([...selectedCartItems, product.name]);
      toast.success(`Success! ${product.name} has found its way into your cart.`);
    }
    // if (user) {
    
    // } 
    // else {
    //   navigate('/login');
    // }
  };



  const filteredProducts = productsAllData.filter((product) =>
    product.name.toLowerCase().includes(filterValue.toLowerCase())
  );




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

  return (
    <div className="wrapper"  onClick={()=>isFilterBoxVisible && setIsFilterBoxVisible(false)}>


      {/* second page container1(s-p-container1) */}
      <div className="s-p-container1" id="s-p-container1">
        <img src="../assets/images/second-page/img1.jpg" alt="" />
      </div>
      {/* second page container2(s-p-c2) */}
{  console.log(isLoading)}
      {isLoading === true ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <div className="nodata-container">
          <h1>Oops, we seem to have misplaced our lenses. They must be on vacation!</h1>
          <p>No products found</p>
          <img src={nodata} alt="No Data Found" />

        </div>
      ) : (<>
        <div className="s-p-c2" onClick={()=>setIsFilterBoxVisible(true)}>
          <div className="s-p-inner-c2-1">
            <label htmlFor="">Glasses for You!</label>
          </div>
          <div className="s-p-inner-c2-2">
            <select
              className="s-p-c2-select"
              name="cars"
              id="cars"
              value={selectedSortingOption}
              onChange={handleSortingChange}
            >
              <option value="sortbyprice">Sort By Price</option>
              <option value="lowToHigh">Low To High</option>
              <option value="highToLow">High To Low</option>
            </select>

            <button className="s-p-c2-btn" style={{ }} >
              <i className="fa-solid fa-sort" />
              Filter
            </button>
          </div>
        </div>
        {/* second page container3(s-p-c3)  */}
        <div className="s-p-c3">


          {eyeproducts && eyeproducts.filter((item) => {

            // console.log(item);
            return item
          }).filter((product) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase())
          ).filter((product) => {

            const productPrice = parseFloat(product.price);
            // Apply gender and price range filters
            if (
              (selectedGender === 'all' || product.gender === selectedGender) &&
              productPrice >= selectedPriceRange[0] &&
              productPrice <= selectedPriceRange[1] &&
              (selectedCategories.length === 0 || selectedCategories.includes(product?.categoryName))
            ) {
              if (selectedRating === 0) {
                // Show all products if "Any Rating" is selected
                return true;
              } else if (selectedRating === 3) {
                return parseFloat(product.rating) < 3;
              } else if (selectedRating === 4) {
                return parseFloat(product.rating) < 4;
              } else if (selectedRating === 5) {
                return parseFloat(product.rating) < 5;
              }
            }
            return false;
          }).filter((product) => {
            // Apply gender filter if selectedGender is not 'all'
            if (selectedGender === 'all' || product.gender === selectedGender) {
              return true;
            }
            return false;
          }).sort((a, b) => {
            if (selectedSortingOption === 'lowToHigh') {
              const diff = parseFloat(a.price) - parseFloat(b.price);
              return diff;
            } else if (selectedSortingOption === 'highToLow') {
              const diff = parseFloat(b.price) - parseFloat(a.price);
              return diff;
            }
            return 0; // Default sorting (by ID or no sorting)
          }).map((product) => (
            <div className="s-p-c3-box" key={product._id.toString()}>
              <div className="s-p-c3-image-box"  >
                <Link
                  to={`/categories-detail/${product.name}`} className="img-height">
                  <img

                    className="s-p-c3-img "
                    src={product.image}
                    alt="product-img"
                  /></Link>
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
                    <div className="s-p-c3-discounted-price">₹{Math.floor(product.price - (product.price * product.descPercentage / 100) )}</div>
                    <div className="s-p-c3-price">₹{product.price}</div>
                  </div>
                </div>
                <div className="s-p-c3-Product-type">{product.brand}</div>
                <div className="s-p-c3-buttons">
                  {/* Add to Cart Button */}
                  <button
                    className={`s-p-c3-addtocart ${selectedCartItems.includes(product.name) ? 'change-in-color' : ''
                      }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {selectedCartItems.includes(product.name) ? 'Remove from bag ' : 'Add to Bag'}
                  </button>

                  {/* Add to Wishlist Button */}
                  <button
                    className={`s-p-c3-save ${selectedProducts.includes(product.name) ? 'red-color' : ''
                      }`}
                    onClick={() => handleWishlistClick(product)}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </button>


                </div>
              </div>
            </div>

          ))}

          <button className="down-to-up-btn" id="scrollToTopButton">
            <i className="fa-solid fa-angle-up" />
          </button>
          {/*  filter box */}

          <div className={`filter-box ${isFilterBoxVisible ? 'visible' : ''}`} id="filter-box">
            <div className="filter-content">
              <div className="filter-header">
                <h1>Filter Products</h1>
                <button onClick={toggleFilterBox}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <button onClick={resetFilters}>Clear</button>
              <div className="gender-box filter-container">
                <h3 className="filter-heading">Gender</h3>
                <div className="gender-inner-box">
                  <div className="gender-box-col1">
                    <button className={`gender-btn ${selectedGender === 'all' ? 'clicked-gender-btn' : ''}`}
                      onClick={() => setSelectedGender('all')}>All</button>
                    <button className={`gender-btn ${selectedGender === 'Men' ? 'clicked-gender-btn' : ''}`}
                      onClick={() => setSelectedGender('Men')}>Men</button>
                  </div>

                  <div className="gender-box-col2">
                    <button className={`gender-btn ${selectedGender === 'Women' ? 'clicked-gender-btn' : ''}`}
                      onClick={() => setSelectedGender('Women')}>Women</button>
                    <button className={`gender-btn ${selectedGender === 'Unisex' ? 'clicked-gender-btn' : ''}`}
                      onClick={() => setSelectedGender('Unisex')}>Unisex</button>
                  </div>

                </div>
              </div>
              <div className="price-range filter-container">
                <h3 className="price-range-heading filter-heading">Price Range</h3>
                <input
                  type="range"
                  className="filter-range"
                  min="0"
                  max="4999"
                  step="1"
                  value={selectedPriceRange[1]} // Use the upper bound of the range
                  onChange={(e) => setSelectedPriceRange([0, parseFloat(e.target.value)])}
                />
                <div className="range-number">
                  <span>0</span>
                  <span>2000</span>
                  <span>4999</span>
                </div>
              </div>
              <div className="categories filter-container">
                <h3 className="categories-heading filter-heading">Categories...</h3>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('Vision')}
                  onChange={() => handleCategoryChange('Vision')}
                />
                <label>Vision</label> <br />
                <br />
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('Sunglasses')}
                  onChange={() => handleCategoryChange('Sunglasses')}
                />
                <label>Sunglasses</label> <br />
                <br />
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('Sports')}
                  onChange={() => handleCategoryChange('Sports')}
                />
                <label>Sports</label>
              </div>



              <div className="rating filter-container">
                <h3 className="rating-heading filter-heading">Rating.</h3>
                <div className="filter-radio-btn-container">
                  <span>
                    <input
                      name="star"
                      type="radio"
                      checked={selectedRating === 0}
                      onChange={() => setSelectedRating(0)}
                    />
                    <label htmlFor="">Any Rating</label>
                  </span>
                  <span>
                    <input name="star" type="radio" checked={selectedRating === 3}
                      onChange={() => setSelectedRating(3)} />
                    <label htmlFor="">3 Stars &amp; below</label>
                  </span>

                  <span>
                    <input name="star" type="radio" checked={selectedRating === 4}
                      onChange={() => setSelectedRating(4)} />
                    <label htmlFor="">4 Stars &amp; below</label>
                  </span>

                  <span>
                    <input name="star" type="radio" checked={selectedRating === 5}
                      onChange={() => setSelectedRating(5)} />
                    <label htmlFor="">5 Stars &amp; below</label>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div></>)}

    </div>

  )
}

export default Categories