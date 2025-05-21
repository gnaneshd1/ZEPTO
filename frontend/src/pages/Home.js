import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import ProductSection from '../components/ProductSection';
import PaanCornerBanner from './PaanCornerBanner';
import PromoBanners from '../components/PromoBanners';
import CoffeeLovers from '../components/CoffeeLovers';
import MoreToLove from '../components/MoreToLove';
import Admin from '../pages/Admin';
import VendorUpload from '../components/VendorUpload/VendorUpload';
import AdminMainPage from './AdminMainPage'
import AdminDashboard from './AdminDashboard'
import BankCards from "./BankCards"
import Divine from "./Divine"
import HowItWorks from "./HowItWorks"
import PopularSearch from "./PopularSearch"
import Footer from "./Footer"

function Home({ 
  addToCart, 
  searchQuery, 
  selectedBrand, 
  selectedCategory,
  onCategorySelect 
}) {
  const [users, setUsers] = useState([]); 
  const [productList, setProductList] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5005/auth/zepto-login');
        setProductList(res?.data || []);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch products');
      }
    }
    fetchProducts();
  }, []);


  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://localhost:5005/auth/zepto-login');
        setUsers(res.data.users);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch users');
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const lowerQuery = searchQuery.toLowerCase();
      
      const filtered = productList.filter(product => {
        const name = product?.name?.toLowerCase() || '';
        const category = product?.category?.toLowerCase() || '';
        const brand = product?.brand?.toLowerCase() || '';

        return (
          (name.includes(lowerQuery) || 
          category.includes(lowerQuery) || 
          brand.includes(lowerQuery)) &&
          (!selectedBrand || brand === selectedBrand.toLowerCase()) &&
          (!selectedCategory || category === selectedCategory.toLowerCase())
        );
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, selectedBrand, selectedCategory, productList]);

  return (
    <div className="home-page">
      <div className="content">
        <Cards 
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        />

     {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') &&  <PaanCornerBanner />}
       

         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <PromoBanners />}
          
          {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') &&  <BankCards/>}

         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <CoffeeLovers />}

        
        
        <div className="App" style={{ padding: '20px' }}> {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') &&    <MoreToLove /> }</div>


         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <Divine />}


         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <HowItWorks />}

         
         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <PopularSearch />}


         {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <Footer />}





        {/* <VendorUpload/> */}

        {/* <AdminDashboard/> */}

        {/* <Admin /> */}
        {/* <AdminMainPage/> */}

          {(searchQuery.trim() !== '' || selectedBrand.trim() !== '' || selectedCategory.trim() !== '') && 
            <ProductSection Product={filteredProducts} />
          }


      {/* 
        <ProductSection 
          Product={filteredProducts}  /> */}
        {message && <p className="text-danger mt-3">{message}</p>}


       
      </div>
    </div>
  );
}

export default Home;