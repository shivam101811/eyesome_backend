import React, { useEffect, useState } from 'react';
import img1 from '../assets/images/eye-icon/img-1.png'
import img2 from '../assets/images/payment-option/cash-on-delivery.png'
import img3 from '../assets/images/payment-success/pay-success.gif'

function BillingDetails({ cartDetails }) {
  const subtotal = cartDetails.reduce(
    (total, cartItem) => total + parseFloat(cartItem.price) * cartItem.quantity,
    0
  );

  const discountTotal = cartDetails.reduce(
    (total, cartItem) =>
      total +
      (parseFloat(cartItem.price) - parseFloat(cartItem.discountPrice)) *
      cartItem.quantity,
    0
  );

  const total = subtotal - discountTotal;

  const [showForm, setShowForm] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobileNumber: '',
    buildingDetails: '',
    areaDetails: '',
    city: '',
    pinCode: '',
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

  const handleAddAddressClick = () => {
    setShowForm(true);
    setSelectedAddressIndex(-1); // Reset selected address index
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setSelectedAddressIndex(-1); // Reset selected address index
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    setShowForm(false); // Hide the form after submission
    setSelectedAddressIndex(-1); // Reset selected address index
  };

  const handleSaveClick = () => {
    if (
      newAddress.fullName &&
      newAddress.mobileNumber &&
      newAddress.buildingDetails &&
      newAddress.areaDetails &&
      newAddress.city &&
      newAddress.pinCode
    ) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({
        fullName: '',
        mobileNumber: '',
        buildingDetails: '',
        areaDetails: '',
        city: '',
        pinCode: '',
      });
      setShowForm(false);
      setSelectedAddressIndex(-1); // Reset selected address index
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  // place order button
  const handlePlaceOrderClick = () => {
    setPlaceOrder((prevShowForm) => !prevShowForm); // Toggle showForm state
  };

  const handleXMarkClick = () => {
    setPlaceOrder(false); // Hide the placeorder-wrapper
    setShowPaymentBox(false)

  };


  // paymentbox
  const [showPaymentBox, setShowPaymentBox] = useState(false);

  const handleConfirmOrderClick = () => {
    setShowPaymentBox(true); // Show the payment box
  };

  // payment confirmed


  // Add a state variable to track whether the checkbox is checked
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // Add a state variable to track payment confirmation
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

 


  const [redirectHome, setRedirectHome] = useState(false); // State for redirecting


  const handleConfirmPaymentClick = () => {
    if (isCheckboxChecked) {
      setPaymentConfirmed(true);

      // Automatically redirect to home after 5 seconds
      setTimeout(() => {
        setRedirectHome(true);
      }, 2000);
    } else {
      alert('Please check the checkbox to confirm payment.');
    }
  };

  // Use useEffect to trigger the redirection
  useEffect(() => {
    if (redirectHome) {
      // Redirect to home component ('/')
      window.location.href = '/';
    }
  }, [redirectHome]);

  return (
    <div className="wrapper">
      <div className="b-p-container-box">
        <div className="b-p-container1">
          <h3 className="b-p-c1-heading">Address</h3>
          {/* addressbox */}

          {showForm ? (
            <form className="addressbox" onSubmit={handleSubmit}>
              <div className="addressbox1">
                <div className="ab-info">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    onChange={handleInputChange}
                    value={newAddress.fullName}
                  />
                </div>
                <div className="ab-info">
                  <label htmlFor="mobileNumber">Mobile No.</label>
                  <input
                    type="number"
                    id="mobileNumber"
                    onChange={handleInputChange}
                    value={newAddress.mobileNumber}
                  />
                </div>
              </div>
              <div className="addressbox2">
                <div className="ab-building-details">
                  <label htmlFor="buildingDetails">Flat, House no., Building</label>
                  <input
                    type="text"
                    id="buildingDetails"
                    onChange={handleInputChange}
                    value={newAddress.buildingDetails}
                  />
                </div>
              </div>
              <div className="addressbox3">
                <div className="ab-area-details">
                  <label htmlFor="areaDetails">Area, Colony, Street</label>
                  <input
                    type="text"
                    id="areaDetails"
                    onChange={handleInputChange}
                    value={newAddress.areaDetails}
                  />
                </div>
              </div>
              <div className="addressbox4">
                <div className="ab-info2">
                  <label htmlFor="city">Town/City</label>
                  <input
                    type="text"
                    id="city"
                    onChange={handleInputChange}
                    value={newAddress.city}
                  />
                </div>
                <div className="ab-info2">
                  <label htmlFor="pinCode">Pin Code</label>
                  <input
                    type="text"
                    id="pinCode"
                    onChange={handleInputChange}
                    value={newAddress.pinCode}
                  />
                </div>
              </div>
              <div className="addressbox5">
                <button className="a_i_p_btn1" onClick={handleCancelClick}>
                  Cancel
                </button>
                <button
                  className="a_i_p_btn2"
                  type="button"
                  onClick={handleSaveClick}
                  style={{
                    cursor:
                      !newAddress.fullName || !newAddress.mobileNumber ||
                        !newAddress.buildingDetails || !newAddress.areaDetails || !newAddress.city || !newAddress.pinCode
                        ? 'no-drop'
                        : 'pointer',
                  }}
                  disabled={

                    !newAddress.fullName ||
                    !newAddress.mobileNumber ||
                    !newAddress.buildingDetails ||
                    !newAddress.areaDetails ||
                    !newAddress.city ||
                    !newAddress.pinCode
                  }
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <button className="a-t-c-c2-button" onClick={handleAddAddressClick}>
              + Add New Address
            </button>
          )}


          {addresses.map((address, index) => (
            <div className="b-p-c1-addressbox" key={index}>
              <input
                type="radio"
                checked={index === selectedAddressIndex}
                onChange={() => setSelectedAddressIndex(index)}
              />
              <div className="b-p-c1-details">
                <h4 className="b-p-c1-details-heading">{address.fullName}</h4>
                <div className="b-p-c1-details1">{address.buildingDetails}</div>
                <div className="b-p-c1-details1">{address.areaDetails}</div>
                <div className="b-p-c1-details1">
                  {address.city}, {address.pinCode}
                </div>
                <div className="b-p-c1-mobile">
                  <b>Mobile: </b>
                  {address.mobileNumber}
                </div>
              </div>
            </div>
          ))}


          <div className="b-p-c1-addressbox" key={-1}>
            <input
              type="radio"
              checked={selectedAddressIndex === -1}
              onChange={() => setSelectedAddressIndex(-1)}
            />
            <div className="b-p-c1-details">
              <h4 className="b-p-c1-details-heading">Jeon Jungkook</h4>
              <div className="b-p-c1-details1">
                42, Yongsan Trade Center, Yongsan, Hangang-daero
              </div>
              <div className="b-p-c1-details1">Seoul, 04322</div>
              <div className="b-p-c1-mobile">
                <b>Mobile: </b>0637291830
              </div>
            </div>
          </div>
        </div>
        <div className="b-p-container2">
          <div className="b-p-container2-1">
            <h3 className="b-p-c2-heading">Order Summary</h3>
            {cartDetails.map(cartItem => (
              <div className="b-p-c2-productDetails" key={cartItem.id}>
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                />
                <div className="b-p-c2-pd2">
                  <div className="b-p-c2-productname">{cartItem.name}</div>
                  <div className="b-p-c2-price">
                    ₹{parseFloat(cartItem.discountPrice) * cartItem.quantity}{' '}
                    <span>₹{cartItem.price}</span>
                  </div>
                </div>
                <div className="b-p-c2-pd3">x{cartItem.quantity}</div>
              </div>
            ))}
          </div>

          <div className="b-p-container2-2">
            {/* Other sections */}
            <div className="b-p-info">
              <label htmlFor="">Subtotal</label> <span>₹{subtotal}</span>
            </div>
            <div className="b-p-info">
              <label htmlFor="">Discount</label> <span>- ₹{discountTotal}</span>
            </div>
            <div className="b-p-info">
              <label htmlFor="">Delivery Charges</label> <span>Free</span>
            </div>
            <div className="b-p-info-total">
              <label htmlFor="">Total</label> <span>₹{total}</span>
            </div>

          </div>


          <button
            className="a-t-c-c2-button"
            onClick={total === 0 ? null : handlePlaceOrderClick}
            style={{
              cursor: total === 0 ? 'no-drop' : 'pointer',
            }}
            disabled={total === 0}
          >
            Place Order
          </button>
        </div>
      </div>


      {placeOrder && !showPaymentBox && (
        //  Show placeorder-wrapper only if payment box is not visible 
        <div className="placeorder-wrapper">
          <div className="placeorder-box">
            <div className="placeorder-header">
              <h2 className="p-o-wrapper">Order Summary</h2>
              <i className="fa-solid fa-xmark" onClick={handleXMarkClick} />
            </div>
            <div className="p-o-addressbox">
              <h4 className="p-o-title">Address</h4>
              {selectedAddressIndex !== -1 ? (
                <div className="b-p-c1-details">
                  <h4 className="b-p-c1-details-heading">
                    {addresses[selectedAddressIndex].fullName}
                  </h4>
                  <div className="b-p-c1-details1">
                    {addresses[selectedAddressIndex].buildingDetails}
                  </div>
                  <div className="b-p-c1-details1">
                    {addresses[selectedAddressIndex].areaDetails}
                  </div>
                  <div className="b-p-c1-details1">
                    {addresses[selectedAddressIndex].city},{' '}
                    {addresses[selectedAddressIndex].pinCode}
                  </div>
                  <div className="b-p-c1-mobile">
                    <b>Mobile: </b>
                    {addresses[selectedAddressIndex].mobileNumber}
                  </div>
                </div>
              ) : (
                <div className="b-p-c1-details">
                  <h4 className="b-p-c1-details-heading">Jeon Jungkook</h4>
                  <div className="b-p-c1-details1">
                    42, Yongsan Trade Center, Yongsan, Hangang-daero
                  </div>
                  <div className="b-p-c1-details1">Seoul, 04322</div>
                  <div className="b-p-c1-mobile">
                    <b>Mobile: </b>0637291830
                  </div>
                </div>
              )}
            </div>
            <div className="b-p-container2-2">
              {/* Other sections */}
              <div className="b-p-info">
                <label htmlFor="">Subtotal</label> <span>₹{subtotal}</span>
              </div>
              <div className="b-p-info">
                <label htmlFor="">Discount</label> <span>- ₹{discountTotal}</span>
              </div>
              <div className="b-p-info">
                <label htmlFor="">Delivery Charges</label> <span>Free</span>
              </div>
              <div className="b-p-info-total">
                <label htmlFor="">Total</label> <span>₹{total}</span>
              </div>

            </div>
            <button className="p-o-gap a-t-c-c2-button" onClick={handleConfirmOrderClick}>Confirm Order</button>
          </div>
        </div>

      )}

      {showPaymentBox && (
        <div class="placeorder-wrapper">
          <div className="payment-box">
            <div className="payment-box-header">
              <img
                src={img1}
                alt="Eyesome"
              />
              <div className="payment-title">Eyesome</div>
              <i className="fa-solid fa-xmark" onClick={handleXMarkClick} />
            </div>
            {paymentConfirmed ? (
              // Display img3 when payment is confirmed
              <img src={img3} className='payment-success' alt="Payment Confirmed" />
            ) : (
              <div className="payment-method-box">
                <h3 className="payment-method">Preferred Payment Methods</h3>
                <div className="payment-container-box">
                  <div className="c-o-d">
                    <label htmlFor="cash-on-delivery">
                      <img
                        src={img2}
                        alt="Cash On Delivery"
                      />
                      Cash On Delivery
                    </label>
                    <input type="checkbox"
                      id="cash-on-delivery"
                      checked={isCheckboxChecked}
                      onChange={handleCheckboxChange} />
                  </div>
                </div>
                <footer className="payment-footer">
                  <div className="inner-payment-footer">
                    <div className="payment-price">₹{total}</div>
                    <button
                      onClick={handleConfirmPaymentClick}
                      style={{ cursor: isCheckboxChecked ? 'pointer' : 'no-drop' }}
                      disabled={!isCheckboxChecked}
                    >
                      Pay Now
                    </button> 
                    </div>
                </footer>
              </div>

            )}

          </div>
        </div>

      )}
    </div>
  );
}

export default BillingDetails;
