
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Form,
  FormControl,
  Container,
  Dropdown,
  Badge
} from "react-bootstrap";
import {
  FaUser, FaCoffee, FaHome, FaGift, FaAppleAlt,
  FaHeadphones, FaMobileAlt, FaMagic, FaTshirt, FaTags, FaBaby,
  FaShoppingCart
} from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const CustomNavbar = ({ 
  onSearchChange, 
  searchQuery, 
  onCategorySelect,
  cartItems = []
}) => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { user, logout } = useAuth();

  const handleLogoClick = () => navigate('/home');
  const handleSuperSaverToggle = () => navigate('/super-saver');
  const handleSearch = (e) => e.preventDefault();
  const handleCartClick = () => navigate('/cart');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategoryClick = (category) => {
    onCategorySelect?.(category);
  };

  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getUserInitials = () => {
    if (!user?.email) return '';
    const emailPrefix = user.email.split('@')[0];
    // localStorage.setItem('firstName', res.data.user.firstName);
    return emailPrefix.slice(0, 2).toUpperCase();
  };

  const categories = [
    { icon: <FaCoffee />, name: "Cafe" },
    { icon: <FaHome />, name: "Home" },
    { icon: <FaGift />, name: "Toys" },
    { icon: <FaAppleAlt />, name: "Fresh" },
    { icon: <FaHeadphones />, name: "Electronics" },
    { icon: <FaMobileAlt />, name: "Mobiles" },
    { icon: <FaMagic />, name: "Beauty" },
    { icon: <FaTshirt />, name: "Fashion" },
    { icon: <FaTags />, name: "Deal Zone" },
    { icon: <FaBaby />, name: "Baby Store" }
  ];

  return (
    <div style={{ 
      width: "100vw", 
      background: "linear-gradient(to bottom, #D9A6F9, #F1E3FE, white)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      position: 'relative',
      zIndex: 1000
    }}>
      <BootstrapNavbar expand="lg" style={{ 
        padding: "10px 20px",
        background: "transparent",
      }}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <BootstrapNavbar.Brand
              onClick={handleLogoClick}
              style={{ 
                color: "#a000c8", 
                fontWeight: "bold", 
                fontSize: "26px",
                cursor: "pointer"
              }}
              className="hover-grow"
            >
              zepto
            </BootstrapNavbar.Brand>

            <div 
              onClick={handleSuperSaverToggle}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #ff8a00, #ff0058)',
                color: 'white',
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '12px',
              }}
              className="hover-pulse"
            >
              SUPER SAVER
            </div>
          </div>

          <Form className="d-flex flex-grow-1 mx-4" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder='Search for "kurkure"'
              value={searchQuery}
              onChange={handleInputChange}
              className="w-100"
              style={{
                borderRadius: "10px",
                padding: "8px 16px",
                border: "1px solid #ddd",
              }}
            />
          </Form>

          <Nav className="align-items-center gap-3" style={{ position: 'relative', zIndex: 1100 }}>
            {user ? (
              <Dropdown align="end" style={{ position: 'relative', zIndex: 1100 }}>
                <Dropdown.Toggle variant="link" style={{ 
                  color: "black", 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#a000c8',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {getUserInitials()}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ 
                  borderRadius: '10px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  position: 'absolute',
                  zIndex: 1100
                }}>
                  <Dropdown.Item onClick={() => navigate('/UserOrder')}>
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    onClick={handleLogout}
                    style={{ color: '#dc3545' }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link 
                onClick={() => navigate('/login')}
                style={{ color: "black" }}
                className="hover-scale"
              >
                <FaUser size={20} style={{ marginBottom: "3px" }} /> Login
              </Nav.Link>
            )}
            
            <Nav.Link 
              onClick={handleCartClick}
              style={{ 
                color: "black", 
                position: 'relative',
                cursor: 'pointer',
              }}
              className="hover-scale"
            >
              <FaShoppingCart size={20} style={{ marginBottom: "3px" }} /> Cart
              {cartItemCount > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    fontSize: '10px',
                  }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </BootstrapNavbar>

      <Container fluid className="d-flex justify-content-center" style={{ 
        paddingBottom: "15px",
        background: "transparent",
        position: 'relative',
        zIndex: 1
      }}>
        <div className="d-flex gap-4 w-100 justify-content-center">
          {categories.map((category, index) => (
            <div 
              key={index}
              style={{ 
                position: "relative",
                padding: "10px 5px",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "60px",
                color: hoveredCategory === index ? "#a000c8" : "#555"
              }}>
                <span style={{ marginBottom: "5px", fontSize: "18px" }}>
                  {category.icon}
                </span>
                <span>
                  {category.name}
                </span>
              </div>
              {hoveredCategory === index && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "3px",
                  background: "linear-gradient(to right, #ff8a00, #ff0058)",
                }} />
              )}
            </div>
          ))}
        </div>
      </Container>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes underlineGrow {
            0% { width: 0%; opacity: 0; }
            100% { width: 60%; opacity: 1; }
          }
          
          .hover-grow:hover {
            transform: scale(1.05);
          }
          
          .hover-pulse:hover {
            animation: pulse 1s infinite;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .hover-underline:hover {
            text-decoration: underline !important;
            text-decoration-thickness: 2px !important;
          }
          
          .hover-glow:focus {
            box-shadow: 0 0 8px rgba(160, 0, 200, 0.3) !important;
            border-color: #a000c8 !important;
          }
          
          .hover-scale:hover {
            transform: scale(1.05);
          }
          
          .hover-bounce:hover {
            animation: bounce 0.5s;
          }
          
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default CustomNavbar;