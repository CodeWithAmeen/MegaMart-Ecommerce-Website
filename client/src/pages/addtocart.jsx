import React, { useState, useEffect } from 'react';
import './CSS/addtocart.css';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);
  }, []);

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    const updatedCartItems = cartItems.filter((_, i) => i !== deleteIndex);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setShowConfirmDialog(false);
    setDeleteIndex(null);

    // Show success alert
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000); // Alert disappears after 3 seconds
  };

  const handleShopNow = () => {
    // Define the behavior for the "Shop Now" button
    window.location.href = '/'; // Adjust the URL as needed
  };

  return (
    <div className="add-to-cart-page">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img
            src="images/cartimg.png" // Replace with your image URL
            alt="Empty Cart"
            className="empty-cart-image"
          />
          <h2>No Collections</h2>
          <p>Your cart is empty. Start adding items to it!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <h2>Your Cart</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imgSrc} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Rating: {item.rating}</p>
                  <p>Price: {item.discountPrice || item.price}</p>
                  <button
                    className="delete-button"
                    onClick={() => confirmDelete(index)}
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </div>
                <button className="shop-now" onClick={handleShopNow}>
                  <i className="fa fa-shopping-cart"></i> Shop Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {showConfirmDialog && (
        <div className="confirm-dialog">
          <div className="dialog-content">
            <h3>Are you sure you want to delete this item?</h3>
            <div className="dialog-buttons">
              <button className="cancel-button" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessAlert && (
        <div className="success-alert">
          <p>Item deleted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
