import { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [pendingProducts, setPendingProducts] = useState([]);

  const addPendingProduct = (product) => {
    setPendingProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const removePendingProduct = (id) => {
    setPendingProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ pendingProducts, addPendingProduct, removePendingProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);