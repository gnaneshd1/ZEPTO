import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

function ProductList({ product }) {
  const dispatch = useDispatch();

  const handleShoppingBagClick = () => {
    if (!product?.id) return;
    
    dispatch(addToCart({
      ...product,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image || 'default-image.jpg'
    }));
  };

  return (
    <ul className="d-flex align-items-center justify-content-center list-unstyled icons">
      <li className="icon" onClick={handleShoppingBagClick} aria-label="Add to Cart">
        <span className="fas fa-shopping-bag"></span>
      </li>
    </ul>
  );
}

export default ProductList;