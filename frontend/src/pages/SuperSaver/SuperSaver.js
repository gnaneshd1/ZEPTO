

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Button, Modal, Form, InputGroup } from "react-bootstrap";
// import { FaMinus, FaPlus } from "react-icons/fa";

// const SuperSaver = ({ addToCart }) => {
//   const navigate = useNavigate();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);



// //  Product data with image URLs
//   const products = [
//     {
//       id: 1,
//       name: "Carrot Ooty",
//       weight: "500 g",
//       price: 11,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/14fd9b8b-82e8-4a8c-9c6b-f306f6d46323/Carrot-Ooty.jpeg",
//     },
//     {
//       id: 2,
//       name: "Carrot Local",
//       weight: "500 g",
//       price: 10,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-336,pr-true,f-auto,q-80/inventory/product/7ae21cf6-2ac9-48c8-8e6f-cf27edc2aaaa-7de8a131-bfb2-4121-8615-dad1dc0306ae/Carrot-Local.jpeg",
//     },
//     {
//       id: 3,
//       name: "Sweet Corn",
//       weight: "2 pcs",
//       price: 15,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/1d1fc004-5613-4c60-949f-9c4ad520caad/Sweet-Corn.jpeg",
//     },
//     {
//       id: 4,
//       name: "Kool Khol",
//       weight: "500 g",
//       price: 12,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/6da1be48-bc58-4e5f-906e-d2354ef7d526/Knol-Khol.jpeg",
//     },
//     {
//       id: 5,
//       name: "Beans Cluster (Savar Pisil)",
//       weight: "250 g",
//       price: 14,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/a119fad0-e758-4d26-89c7-644b29f3cd45/Beans-Cluster-Gawar-Phali-.jpeg",
//     },
//     {
//       id: 6,
//       name: "Capricum Green",
//       weight: "500 g",
//       price: 18,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/189f047d-fdc5-46b7-a131-896af340416b/Capsicum-Green.jpeg",
//     },
//     {
//       id: 7,
//       name: "Pointed Gourd (Parvaj)",
//       weight: "500 g",
//       price: 16,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-500,pr-true,f-auto,q-80/inventory/product/48fe98fc-6437-4337-b391-7aa6f8bc3ec2-aa181b25-8540-4d4b-8c8b-b20fe93a601b/Pointed-Gourd-Parwal-.jpeg",
//     },
//     {
//       id: 8,
//       name: "Carrot",
//       weight: "500 g",
//       price: 11,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-384-347,pr-true,f-auto,q-80/inventory/product/920a880d-72ee-46bc-9571-a8572dbe4f18-c8ff0570-c618-4933-b18c-2c70620d0f29/Carrot.jpeg",
//     },
//     {
//       id: 9,
//       name: "Capricum",
//       weight: "500 g",
//       price: 20,
//       category: "Fruits & Vegetables",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/189f047d-fdc5-46b7-a131-896af340416b/Capsicum-Green.jpeg",
//     },
//   ];

//   const laundryProducts = [
//     {
//       id: 10,
//       name: "Detergent Powder",
//       weight: "1 kg",
//       price: 106,
//       category: "Laundry Care",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/84261ab8-edf9-4e8d-b926-66ed5aad4136/Surf-Excel-Matic-Front-Load-Detergent-Powder.jpeg",
//     },
//     {
//       id: 11,
//       name: "Fabric Softener",
//       weight: "1 L",
//       price: 191,
//       category: "Laundry Care",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-500,pr-true,f-auto,q-80/cms/product_variant/925be2bd-999a-433e-acbc-a37026bb4b3c/Kikgerm-Expert-Matic-Front-Load-Detergent.jpg",
//     },
//     {
//       id: 12,
//       name: "Stain Remover",
//       weight: "500 ml",
//       price: 71,
//       category: "Laundry Care",
//       image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/62107307-0d8a-42cc-9905-ba14b4655149/Wheel-Green-Lemon-Jasmine-Detergent-Powder.jpeg",
//     },
//   ];
//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setQuantity(1);
//   };

//   const handleClose = () => {
//     setSelectedProduct(null);
//   };

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity > 0) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleAddToCart = () => {
//     const itemToAdd = {
//       ...selectedProduct,
//       quantity,
//       totalPrice: selectedProduct.price * quantity,
//     };
    
//     if (addToCart) {
//       addToCart(itemToAdd);
//     }
    
//     handleClose();
//   };

//   return (
//     <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//       <div
//         style={{
//           background: "url('https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           color: "white",
//           padding: "20px",
//           textAlign: "center",
//           marginBottom: "20px",
//           minHeight: "320px",
//           minWidth: "500px",
//           flexDirection: "column",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           paddingBottom: "60px"
//         }}
//       >
//         <h2 style={{ margin: "0 0 10px 0", fontSize: "24px", fontWeight: "bold" }}></h2>
//         <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}></h3>
//         <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "14px" }}>
//         </div>
//       </div>

//       <Container>
//         <div
//           style={{
//             display: "flex",
//             overflowX: "auto",
//             gap: "15px",
//             padding: "10px 0",
//             marginBottom: "20px",
//           }}
//         >
//           {[
//             // ... (same category data as original)
//           ].map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 minWidth: "150px",
//                 backgroundColor: "white",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               <img 
//                 src={item.image} 
//                 alt={item.name}
//                 style={{
//                   width: "100%",
//                   height: "100px",
//                   objectFit: "cover",
//                   borderRadius: "4px",
//                   marginBottom: "8px"
//                 }}
//               />
//               <div style={{ fontWeight: "bold" }}>{item.name}</div>
//               <div style={{ fontSize: "14px", color: "#ff0058" }}>
//                 {item.price}
//               </div>
//             </div>
//           ))}
//         </div>

//         <h2 style={{ marginBottom: "20px" }}>Fruits & Vegetables</h2>
//         <div
//           style={{
//             display: "flex",
//             overflowX: "auto",
//             gap: "15px",
//             paddingBottom: "20px",
//           }}
//         >
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onClick={() => handleProductClick(product)}
//             />
//           ))}
//         </div>

//         <h2 style={{ marginBottom: "20px", marginTop: "30px" }}>Laundry Care</h2>
//         <div
//           style={{
//             display: "flex",
//             overflowX: "auto",
//             gap: "15px",
//             paddingBottom: "20px",
//           }}
//         >
//           {laundryProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onClick={() => handleProductClick(product)}
//             />
//           ))}
//         </div>
//       </Container>

//       <Modal show={selectedProduct !== null} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedProduct?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedProduct && (
//             <div>
//               <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                 <img
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   style={{
//                     maxWidth: "100%",
//                     maxHeight: "200px",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Weight:</strong> {selectedProduct.weight}
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Price:</strong> €{selectedProduct.price}
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Quantity:</strong>
//                 <InputGroup style={{ width: "150px", marginTop: "10px" }}>
//                   <Button
//                     variant="outline-secondary"
//                     onClick={() => handleQuantityChange(quantity - 1)}
//                   >
//                     <FaMinus />
//                   </Button>
//                   <Form.Control
//                     type="number"
//                     value={quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(parseInt(e.target.value) || 1)
//                     }
//                     style={{ textAlign: "center" }}
//                   />
//                   <Button
//                     variant="outline-secondary"
//                     onClick={() => handleQuantityChange(quantity + 1)}
//                   >
//                     <FaPlus />
//                   </Button>
//                 </InputGroup>
//               </div>
//               <div style={{ fontWeight: "bold", marginBottom: "15px" }}>
//                 Total: €{(selectedProduct.price * quantity).toFixed(2)}
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             style={{ backgroundColor: "#a000c8", borderColor: "#a000c8" }}
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// const ProductCard = ({ product, onClick }) => {
//   return (
//     <div
//       style={{
//         minWidth: "150px",
//         backgroundColor: "white",
//         borderRadius: "8px",
//         padding: "15px",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         cursor: "pointer",
//       }}
//       onClick={onClick}
//     >
//       <div style={{ textAlign: "center", marginBottom: "10px" }}>
//         <img
//           src={product.image}
//           alt={product.name}
//           style={{
//             width: "80px",
//             height: "80px",
//             objectFit: "cover",
//             borderRadius: "8px",
//           }}
//         />
//       </div>
//       <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//         {product.name}
//       </div>
//       <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
//         {product.weight}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ fontWeight: "bold", color: "#a000c8" }}>
//           €{product.price}
//         </div>
//         <Button
//           variant="primary"
//           size="sm"
//           style={{
//             backgroundColor: "#a000c8",
//             borderColor: "#a000c8",
//             borderRadius: "20px",
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             onClick();
//           }}
//         >
//           Add
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SuperSaver;















import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Modal, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { addToCart } from '../../actions/cartActions';


// Product data with image URLs (moved before component)
const products = [
  {
    id: 1,
    name: "Carrot Ooty",
    weight: "500 g",
    price: 11,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/14fd9b8b-82e8-4a8c-9c6b-f306f6d46323/Carrot-Ooty.jpeg",
  },
  {
    id: 2,
    name: "Carrot Local",
    weight: "500 g",
    price: 10,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-336,pr-true,f-auto,q-80/inventory/product/7ae21cf6-2ac9-48c8-8e6f-cf27edc2aaaa-7de8a131-bfb2-4121-8615-dad1dc0306ae/Carrot-Local.jpeg",
  },
  {
    id: 3,
    name: "Sweet Corn",
    weight: "2 pcs",
    price: 15,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/1d1fc004-5613-4c60-949f-9c4ad520caad/Sweet-Corn.jpeg",
  },
  {
    id: 4,
    name: "Kool Khol",
    weight: "500 g",
    price: 12,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/6da1be48-bc58-4e5f-906e-d2354ef7d526/Knol-Khol.jpeg",
  },
  {
    id: 5,
    name: "Beans Cluster (Savar Pisil)",
    weight: "250 g",
    price: 14,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/a119fad0-e758-4d26-89c7-644b29f3cd45/Beans-Cluster-Gawar-Phali-.jpeg",
  },
  {
    id: 6,
    name: "Capricum Green",
    weight: "500 g",
    price: 18,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/189f047d-fdc5-46b7-a131-896af340416b/Capsicum-Green.jpeg",
  },
  {
    id: 7,
    name: "Pointed Gourd (Parvaj)",
    weight: "500 g",
    price: 16,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-500,pr-true,f-auto,q-80/inventory/product/48fe98fc-6437-4337-b391-7aa6f8bc3ec2-aa181b25-8540-4d4b-8c8b-b20fe93a601b/Pointed-Gourd-Parwal-.jpeg",
  },
  {
    id: 8,
    name: "Carrot",
    weight: "500 g",
    price: 11,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-384-347,pr-true,f-auto,q-80/inventory/product/920a880d-72ee-46bc-9571-a8572dbe4f18-c8ff0570-c618-4933-b18c-2c70620d0f29/Carrot.jpeg",
  },
  {
    id: 9,
    name: "Capricum",
    weight: "500 g",
    price: 20,
    category: "Fruits & Vegetables",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/189f047d-fdc5-46b7-a131-896af340416b/Capsicum-Green.jpeg",
  },
];

const laundryProducts = [
  {
    id: 10,
    name: "Detergent Powder",
    weight: "1 kg",
    price: 106,
    category: "Laundry Care",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/84261ab8-edf9-4e8d-b926-66ed5aad4136/Surf-Excel-Matic-Front-Load-Detergent-Powder.jpeg",
  },
  {
    id: 11,
    name: "Fabric Softener",
    weight: "1 L",
    price: 191,
    category: "Laundry Care",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-500-500,pr-true,f-auto,q-80/cms/product_variant/925be2bd-999a-433e-acbc-a37026bb4b3c/Kikgerm-Expert-Matic-Front-Load-Detergent.jpg",
  },
  {
    id: 12,
    name: "Stain Remover",
    weight: "500 ml",
    price: 71,
    category: "Laundry Care",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/62107307-0d8a-42cc-9905-ba14b4655149/Wheel-Green-Lemon-Jasmine-Detergent-Powder.jpeg",
  },
];

// Stock initialization function
const initializeStockData = () => {
  const initialStock = {};
  [...products, ...laundryProducts].forEach(product => {
    initialStock[product.id] = 6;
  });
  return initialStock;
};

const SuperSaver = () => {
  const dispatch = useDispatch();
  // Removed unused navigate
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [stockData, setStockData] = useState(initializeStockData());


  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowStockAlert(false);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowStockAlert(false);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    
    if (selectedProduct && newQuantity > stockData[selectedProduct.id]) {
      setShowStockAlert(true);
      setQuantity(stockData[selectedProduct.id]);
    } else {
      setShowStockAlert(false);
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    const itemToAdd = {
      ...selectedProduct,
      quantity,
      totalPrice: selectedProduct.price * quantity,
    };
    
    dispatch(addToCart(itemToAdd));
    
    setStockData(prev => ({
      ...prev,
      [selectedProduct.id]: prev[selectedProduct.id] - quantity
    }));
    
    handleClose();
  };

  return (
    <div className="super-saver-container">
      <div className="hero-banner">
        {/* Banner content same as original */}
      </div>

      <Container>
        <ProductCategory 
          title="Fruits & Vegetables" 
          products={products} 
          stockData={stockData}
          onProductClick={handleProductClick}
        />
        
        <ProductCategory 
          title="Laundry Care" 
          products={laundryProducts} 
          stockData={stockData}
          onProductClick={handleProductClick}
        />
      </Container>

      <ProductModal 
        show={selectedProduct !== null}
        product={selectedProduct}
        quantity={quantity}
        stockData={stockData}
        showStockAlert={showStockAlert}
        onClose={handleClose}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
        setShowStockAlert={setShowStockAlert} // Added this prop
      />
    </div>
  );
};

const ProductCategory = ({ title, products, stockData, onProductClick }) => (
  <>
    <h2 className="category-title">{title}</h2>
    <div className="products-scroll-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          stock={stockData[product.id]}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  </>
);

const ProductCard = ({ product, stock, onClick }) => {
  const isOutOfStock = stock <= 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={onClick}>
      {isOutOfStock && <div className="stock-overlay">Out of Stock</div>}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-weight">{product.weight}</p>
        <div className="price-add-container">
          <span className="product-price">Rs.{product.price}</span>
          <Button
            variant="primary"
            className={`add-button ${isOutOfStock ? 'disabled' : ''}`}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ 
  show, 
  product, 
  quantity, 
  stockData, 
  showStockAlert, 
  onClose, 
  onQuantityChange, 
  onAddToCart,
  setShowStockAlert // Added this line
}) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{product?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {product && (
        <div className="modal-content">
          <img
            src={product.image}
            alt={product.name}
            className="modal-product-image"
          />
          <div className="product-info">
            <p><strong>Weight:</strong> {product.weight}</p>
            <p><strong>Price:</strong> Rs.{product.price}</p>
            <p><strong>Available Stock:</strong> {stockData[product.id]}</p>
          </div>

         
         {showStockAlert && (
            <Alert 
              variant="warning" 
              dismissible 
              onClose={() => setShowStockAlert(false)} // Fixed this line
            >
              Only {stockData[product.id]} items available!
            </Alert>
          )}



          <div className="quantity-control">
            <strong>Quantity:</strong>
            <InputGroup className="quantity-input-group">
              <Button
                variant="outline-secondary"
                onClick={() => onQuantityChange(quantity - 1)}
              >
                <FaMinus />
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max={stockData[product.id]}
              />
              <Button
                variant="outline-secondary"
                onClick={() => onQuantityChange(quantity + 1)}
              >
                <FaPlus />
              </Button>
            </InputGroup>
          </div>

          <div className="total-price">
            <strong>Total:</strong> Rs.{(product.price * quantity).toFixed(2)}
          </div>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
      <Button
        variant="primary"
        className="add-to-cart-button"
        onClick={onAddToCart}
        disabled={stockData[product?.id] <= 0}
      >
        Add to Cart
      </Button>
    </Modal.Footer>
  </Modal>
);

// CSS Styles (create a separate CSS file or use styled-components)
const styles = `
.super-saver-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.hero-banner {
  background: url('https://cdn.zeptonow.com/production/tr:w-1280,ar-2560-640,pr-true,f-auto,q-80/inventory/banner/257473f7-74bb-439a-915f-6c18d1545cd1.png');
  background-size: cover;
  background-position: center;
  height: 320px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 60px;
}

.category-title {
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.products-scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 20px;
}

.product-card {
  min-width: 150px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  position: relative;
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.stock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  z-index: 1;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto 10px;
  display: block;
}

.product-name {
  font-size: 14px;
  margin-bottom: 5px;
}

.product-weight {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.price-add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #a000c8;
  font-weight: bold;
}

.add-button {
  background-color: #a000c8;
  border-color: #a000c8;
  border-radius: 20px;
  font-size: 14px;
  padding: 5px 15px;
}

.add-button.disabled {
  background-color: #ccc;
  border-color: #ccc;
}

.modal-product-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin: 0 auto 20px;
  display: block;
}

.quantity-input-group {
  width: 150px;
  margin-top: 10px;
}

.add-to-cart-button {
  background-color: #a000c8;
  border-color: #a000c8;
}
  .modal-content {
  padding: 15px;
  text-align: center;
}

.modal-product-image {
  max-width: 100%;
  max-height: 250px;
  border-radius: 12px;
  margin: 0 auto 20px;
  display: block;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border: 2px solid #f5f5f5;
  transition: transform 0.3s ease;
}

.modal-product-image:hover {
  transform: scale(1.02);
}

.product-info {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.product-info p {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
}

.product-info p strong {
  color: #555;
}

.quantity-control {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.quantity-control strong {
  display: block;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.quantity-input-group {
  width: 180px;
  margin: 0 auto;
}

.quantity-input-group .btn {
  background: white;
  border: 1px solid #ddd;
  color: #a000c8;
  font-weight: bold;
  transition: all 0.3s ease;
}

.quantity-input-group .btn:hover {
  background: #f0f0f0;
}

.quantity-input-group .form-control {
  text-align: center;
  font-weight: bold;
  border-left: none;
  border-right: none;
  background: white;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #a000c8;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.modal-footer {
  border-top: none;
  padding-top: 0;
}

.modal-footer .btn {
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.modal-footer .btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: none;
}

.modal-footer .btn-secondary:hover {
  background: #e0e0e0;
}

.modal-footer .btn-primary {
  background: linear-gradient(135deg, #a000c8 0%, #8000a0 100%);
  border: none;
  box-shadow: 0 4px 6px rgba(160, 0, 200, 0.2);
}

.modal-footer .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(160, 0, 200, 0.3);
}

.modal-footer .btn-primary:active {
  transform: translateY(0);
}

/* Alert styling */
.alert-warning {
  background: #fff3cd;
  border: none;
  border-radius: 8px;
  color: #856404;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.alert-warning .close {
  color: #856404;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SuperSaver;