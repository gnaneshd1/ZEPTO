import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'

const ProductPage = ({ products }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ProductDetails products={products} />
    </div>
  )
}

export default ProductPage