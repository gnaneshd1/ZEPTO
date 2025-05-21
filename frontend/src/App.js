// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword';
// import Home from './pages/Home';
// import SuperSaver from './pages/SuperSaver/SuperSaver';
// import CustomNavbar from './components/CustomNavbar';
// import CartPage from './pages/CartPage';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PaanCorner from './components/PaanCorner';
// import Admin from './pages/Admin';
// import PaymentPage from "./pages/PaymentPage";
// import AdminMainPage from "./pages/AdminMainPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import OrderList from "./pages/OrderList";
// import BankCards from "./pages/BankCards";
// import Divine from "./pages/Divine";
// import HowItWorks from "./pages/HowItWorks"
// import PopularSearch from "./pages/PopularSearch"
// import ProductItem from "./components/ProductItem"
// import Footer from "./pages/Footer"
// import UserOrder from './pages/UserOrder'

// function App() {
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [selectedBrand, setSelectedBrand] = React.useState('');
//   const [selectedCategory, setSelectedCategory] = React.useState('');
//   const { cartItems } = useSelector(state => state.cart);

//   // List of paths where navbar should be hidden
//   const hideNavbarPaths = [
//     '/login', 
//     '/', 
//     '/vendor', 
//     '/AdminMainPage', 
//     '/AdminDashboard',
//     '/OrderList'
//   ];
  
//   const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

//   // Filter handlers
//   const handleSearchChange = (query) => setSearchQuery(query);
//   const handleBrandSelect = (brand) => setSelectedBrand(brand);
//   const handleCategorySelect = (category) => setSelectedCategory(category);

//   return (
//     <div className="app-container">
//       {shouldShowNavbar && (
//         <CustomNavbar
//           cartItemCount={cartItems.length}
//           onSearchChange={handleSearchChange}
//           searchQuery={searchQuery}
//           onBrandSelect={handleBrandSelect}
//           selectedBrand={selectedBrand}
//           onCategorySelect={handleCategorySelect}
//           selectedCategory={selectedCategory}
//         />
//       )}
      
//       <main className="main-content">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route 
//             path="/home" 
//             element={
//               <Home 
//                 searchQuery={searchQuery}
//                 selectedBrand={selectedBrand}
//                 selectedCategory={selectedCategory}
//               />
//             } 
//           />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/paan-corner" element={<PaanCorner />} />
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/super-saver" element={<SuperSaver />} />
//           <Route path="/ProductItem" element={<ProductItem />} />

//           <Route path="/vendor" element={<Admin />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/AdminMainPage" element={<AdminMainPage />} />
//           <Route path="/AdminDashboard" element={<AdminDashboard/>} />
//           <Route path="/OrderList" element={<OrderList/>} />
//           <Route path="/BankCards" element={<BankCards/>} />
//           <Route path="/Divine" element={<Divine/>} />
//           <Route path="/HowItWorks" element={<HowItWorks/>} />
//           <Route path="/PopularSearch" element={<PopularSearch/>} />
//           <Route path="/Footer" element={<Footer/>} />
//           <Route path="/UserOrder" element={<UserOrder/>} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;





import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SuperSaver from './pages/SuperSaver/SuperSaver';
import CustomNavbar from './components/CustomNavbar';
import CartPage from './pages/CartPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaanCorner from './components/PaanCorner';
import Admin from './pages/Admin';
import PaymentPage from "./pages/PaymentPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminDashboard from "./pages/AdminDashboard";
import OrderList from "./pages/OrderList";
import BankCards from "./pages/BankCards";
import Divine from "./pages/Divine";
import HowItWorks from "./pages/HowItWorks"
import PopularSearch from "./pages/PopularSearch"
import ProductItem from "./components/ProductItem"
import Footer from "./pages/Footer"
import UserOrder from './pages/UserOrder'

function App() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const { cartItems } = useSelector(state => state.cart);

  // List of paths where navbar should be hidden
  const hideNavbarPaths = [
    '/login', 
    '/', 
    '/vendor', 
    '/AdminMainPage', 
    '/AdminDashboard',
    '/OrderList'
  ];
  
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  // Filter handlers
  const handleSearchChange = (query) => setSearchQuery(query);
  const handleBrandSelect = (brand) => setSelectedBrand(brand);
  const handleCategorySelect = (category) => setSelectedCategory(category);

  return (
    <div className="app-container">
      {shouldShowNavbar && (
        <CustomNavbar
          cartItemCount={cartItems.length}
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          onBrandSelect={handleBrandSelect}
          selectedBrand={selectedBrand}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      )}
      
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <Home 
                searchQuery={searchQuery}
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect} // Added this line
              />
            } 
          />
          {/* Keep all other routes exactly the same */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/paan-corner" element={<PaanCorner />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/super-saver" element={<SuperSaver />} />
          <Route path="/ProductItem" element={<ProductItem />} />
          <Route path="/vendor" element={<Admin />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/AdminMainPage" element={<AdminMainPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/OrderList" element={<OrderList/>} />
          <Route path="/BankCards" element={<BankCards/>} />
          <Route path="/Divine" element={<Divine/>} />
          <Route path="/HowItWorks" element={<HowItWorks/>} />
          <Route path="/PopularSearch" element={<PopularSearch/>} />
          <Route path="/Footer" element={<Footer/>} />
          <Route path="/UserOrder" element={<UserOrder/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;