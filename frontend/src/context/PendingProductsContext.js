// PendingProductsContext.js
import { createContext, useContext, useState } from 'react';

const PendingProductsContext = createContext();

export const PendingProductsProvider = ({ children }) => {
  const [pendingProducts, setPendingProducts] = useState([]);

  const addPendingProduct = (product) => {
    setPendingProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const removePendingProduct = (productId) => {
    setPendingProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <PendingProductsContext.Provider 
      value={{ pendingProducts, addPendingProduct, removePendingProduct }}
    >
      {children}
    </PendingProductsContext.Provider>
  );
};

export const usePendingProducts = () => useContext(PendingProductsContext);