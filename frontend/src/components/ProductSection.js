import React , { useEffect , useState } from 'react' ;
import ProductItem from './ProductItem'
import { useParams } from 'react-router-dom';

function ProductSection({Product}) {
  const category  = useParams();
console.log(Product,"productsproducts",category)
return (
    <div className="container bg-white">
    <div className="row">
{Array.isArray(Product) && Product.length > 0 ? (
  Product.map(product => <ProductItem key={product?._id} product={product} />)
) : (
  <p>No products available</p>
)}

   
   </div>
    </div>
  );
}

export default ProductSection