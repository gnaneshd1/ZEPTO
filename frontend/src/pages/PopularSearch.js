import React, { useState } from 'react';

const PopularSearch = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle item click safely
  const handleItemClick = (productName) => {
    try {
      const product = productDetails[productName];
      if (product) setSelectedProduct(product);
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  // Modal component
  const ProductModal = ({ product, onClose }) => (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeButton} onClick={onClose}>×</button>
        <div style={modalStyles.content}>
          <img 
            src={product?.image || 'https://via.placeholder.com/200'} 
            alt={product?.name || 'Product'} 
            style={modalStyles.image} 
          />
          <div style={modalStyles.details}>
            <h2 style={modalStyles.productName}>{product?.name || 'Product'}</h2>
            <p style={modalStyles.price}>Price: {product?.price ? `₹${product.price}` : 'Varies'}</p>
            <p style={modalStyles.category}>Category: {product?.category || 'General'}</p>
            <p style={modalStyles.description}>{product?.description || 'Product description not available'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      {/* Popular Searches Section */}
      <h2 style={styles.sectionTitle}>Popular Searches</h2>
      <div style={styles.itemsContainer}>
        {popularSearches.map((item, index) => (
          <div 
            key={`search-${index}`} 
            style={styles.item}
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Categories Grid Section */}
      <h2 style={styles.gridSectionTitle}>Categories</h2>
      <div style={styles.gridContainer}>
        {gridCategories.map((item, index) => (
          <div 
            key={`grid-${index}`} 
            style={styles.gridItem}
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
          >
            <span style={styles.gridText}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Data - Complete list with all items
const popularSearches = [
  'Milk', 'Bread', 'Eggs', 'Butter', 'Cheese',
  'Yogurt', 'Rice', 'Wheat', 'Oil', 'Salt',
  'Sugar', 'Tea', 'Coffee', 'Biscuits', 'Snacks'
];

const gridCategories = [
  'Fruits & Vegetables', 'Atta, Rice, Oil & Gals', 'Masala & Dry Fruits', 
  'Sweet Cravings', 'Frozen Food & Ice Creams', 'Baby Food', 
  'Dairy, Bread & Eggs', 'Cold Drinks & Juices', 'Munchies', 
  'Meats, Fish & Eggs', 'Breakfast & Sauces', 'Tea, Coffee & More', 
  'Biscuits', 'Makeup & Beauty', 'Bath & Body', 'Cleaning Essentials', 
  'Home Needs', 'Electricals & Accessories', 'Hygiene & Grooming', 
  'Health & Baby Care', 'Homegrown Brands', 'Paan Corner'
];

// Complete Product Details for all items
const productDetails = {
  'Milk': {
    name: 'Fresh Milk',
    price: 25,
    category: 'Dairy',
    description: 'Pasteurized full cream milk, 1L pouch',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/e7d0ce71-3108-461e-84d4-c7d04e6f4f40/Akshayakalpa-Organic-Cow-Milk-Uht.jpeg'
  },
  'Bread': {
    name: 'Whole Wheat Bread',
    price: 45,
    category: 'Bakery',
    description: 'Freshly baked bread with multigrain',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/db861d74-0ecb-4f56-82dc-5857f87bc80e/Modern-100-Whole-Wheat-Bread-Zero-Maida-No-trans-fat-.jpeg'
  },
  'Eggs': {
    name: 'Farm Fresh Eggs',
    price: 90,
    category: 'Poultry',
    description: 'Pack of 6 country eggs',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/0353e806-d6bb-4f16-8b1c-0e210bcc00ed/Farm-Made-Free-Range-Brown-Eggs-12-Pieces-Protein-Rich-Veg-Feed-Non-Fertile.jpeg'
  },
  'Butter': {
    name: 'Salted Butter',
    price: 120,
    category: 'Dairy',
    description: '500g salted creamy butter',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/54d73bf7-1591-435f-aa70-e0753a44a3d0/Nutralite-Doodhshakti-Probiotic-Butter-Spread.jpeg'
  },
  'Cheese': {
    name: 'Mozzarella Cheese',
    price: 199,
    category: 'Dairy',
    description: '200g block of pizza cheese',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/29aaa7a9-58d4-4ee7-a55b-8f3004321331/D-lecta-100-Mozzarella-Cheese-Pizza-Block.jpeg'
  },
  'Yogurt': {
    name: 'Greek Yogurt',
    price: 80,
    category: 'Dairy',
    description: 'Low-fat probiotic yogurt',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1600-1600,pr-true,f-auto,q-80/cms/product_variant/16cbf1a8-d592-410d-b74d-efe6c021d001/Milky-Mist-Greek-Yogurt.jpeg'
  },
  'Rice': {
    name: 'Basmati Rice',
    price: 150,
    category: 'Grains',
    description: '5kg pack of premium basmati',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/24cc5af9-782b-443f-8265-0d98420dd10f/India-Gate-Flavourful-and-Fine-Dubar-Basmati-Rice-Long-and-Slender-Grains-Naturally-Aged.jpg'
  },
  'Wheat': {
    name: 'Whole Wheat',
    price: 80,
    category: 'Grains',
    description: '5kg organic whole wheat',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/abc0ff1f-1950-46c1-a3b0-5127d0c35bd5/The-Baker-s-Dozen-Fourgrain-Sourdough-Zero-Maida-Gut-Friendly.jpeg'
  },
  'Oil': {
    name: 'Sunflower Oil',
    price: 180,
    category: 'Cooking Essentials',
    description: '1L refined sunflower oil',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/7113f9a9-cd56-42f9-b129-682f02df46ef/Gemini-Pure-It-Refined-Sunflower-Oil-Pouch.jpg'
  },
  'Salt': {
    name: 'Iodized Salt',
    price: 20,
    category: 'Cooking Essentials',
    description: '1kg iodized table salt',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/7e786a33-995b-491b-a64a-eeab5ebe36ca/Tata-Salt-Crystal.jpeg'
  },
  'Sugar': {
    name: 'White Sugar',
    price: 45,
    category: 'Sweeteners',
    description: '1kg refined sugar',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/22a835b1-0686-4c26-87ca-9eead7bbceb6/Madhur-Pure-Hygienic-Fine-Grain-Sugar-Sakkare.jpeg'
  },
  'Tea': {
    name: 'Green Tea',
    price: 150,
    category: 'Beverages',
    description: '50 tea bags of green tea',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-2001-2000,pr-true,f-auto,q-80/cms/product_variant/0242b879-390c-4a3e-b90f-a49c230e0cd3/Tetley-Ginger-Mint-and-Lemon-Green-Tea.jpg'
  },
  'Coffee': {
    name: 'Instant Coffee',
    price: 250,
    category: 'Beverages',
    description: '200g jar of instant coffee',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/d8866e8f-defd-404b-bc22-43d76ebe979b/Levista-Strong-Chicory-Instant-Coffee.jpg'
  },
  'Biscuits': {
    name: 'Digestive Biscuits',
    price: 35,
    category: 'Snacks',
    description: 'Pack of 10 digestive biscuits',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/ef00e0ba-2edc-4dce-bbc9-0ca377058646/The-Baker-s-Dozen-Zero-Maida-Coconut-Oats-Cookies.jpeg'
  },
  'Snacks': {
    name: 'Mixed Snacks',
    price: 100,
    category: 'Snacks',
    description: 'Assorted snack combination pack',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/6d7d637d-1d1f-4ef6-ad24-5817dc697276/Adukale-Congress-Kadlekayi.png'
  },
  'Fruits & Vegetables': {
    name: 'Fresh Produce',
    price: null,
    category: 'Produce',
    description: 'Seasonal fruits and vegetables',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/e1467639-f42e-4e12-8a78-31a72951aea0/Mango-Banganapalli-1kg-Muskmelon-1pc-Watermelon-Kiran-1pc-Combo.jpg'
  },
  'Atta, Rice, Oil & Gals': {
    name: 'Pantry Staples',
    price: null,
    category: 'Essentials',
    description: 'All kitchen essentials collection',
    image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/2f80dadb-3f1f-4f2c-8ebb-02da82e49d87/Kangaro-Staple-Pins.jpg'
  },
  'Masala & Dry Fruits': {
    name: 'Spices & Nuts',
    price: null,
    category: 'Cooking',
    description: 'Premium spices and dry fruits',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2ZUAp0hXKEAor6FAVEcCBINGTQGl17JDrA&s'
  },
  'Sweet Cravings': {
    name: 'Desserts',
    price: null,
    category: 'Sweets',
    description: 'Traditional and modern sweets',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ6qL9-tjMUrOqJro-LZsesHgT7Xtuvse08-N9gjHCUOrzaLyoqqC1jx0sPy7TWfDn-qksRpaT0uv2Xwv8zTg-DQF0OqYBpz0jzp9duDBGW0H4BiuKNVDrS'
  },
  'Frozen Food & Ice Creams': {
    name: 'Frozen Goods',
    price: null,
    category: 'Frozen',
    description: 'Frozen vegetables and ice creams',
    image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/s4/040pxx40.xx40.220921165811.n3s4/catalogue/srt-frozen-food-and-ice-cream-distributor-hyderabad-ice-cream-parlours-ymdxemru5t.jpg'
  },
  'Baby Food': {
    name: 'Infant Nutrition',
    price: null,
    category: 'Baby Care',
    description: 'Organic baby food products',
    image: 'https://m.media-amazon.com/images/I/91pEPMHRueL._AC_UF1000,1000_QL80_.jpg'
  },
  'Dairy, Bread & Eggs': {
    name: 'Daily Essentials',
    price: null,
    category: 'Dairy',
    description: 'Milk, bread and eggs combo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2S0c3EJ5QxbO8nzZ3TpYH4vvA5l41178tsg&s'
  },
  'Cold Drinks & Juices': {
    name: 'Beverages',
    price: null,
    category: 'Drinks',
    description: 'Soft drinks and fresh juices',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7cjrAcl_XJ88Dnd0XZp-3MKPmgxcpX2YdWg&s'
  },
  'Munchies': {
    name: 'Snack Time',
    price: null,
    category: 'Snacks',
    description: 'Chips, nuts and quick snacks',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWZOoxrhgQf1L2a7ZoJk72FjvrNkuwgjcuQ&s'
  },
  'Meats, Fish & Eggs': {
    name: 'Non-Veg',
    price: null,
    category: 'Meat',
    description: 'Fresh meat and seafood',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL686a3zB52H9MhEQD0JVm559s6vqWCySaTQ&s'
  },
  'Breakfast & Sauces': {
    name: 'Morning Essentials',
    price: null,
    category: 'Breakfast',
    description: 'Cereals, spreads and sauces',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmQM87fo9RFM59jfdOBhyAsoCbyDXP1FnZw&s'
  },
  'Tea, Coffee & More': {
    name: 'Hot Beverages',
    price: null,
    category: 'Drinks',
    description: 'Tea, coffee and health drinks',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ7Q5ehWKdlcThv_SBr9-cWy2rgWhPr7B3QA&s'
  },
  'Makeup & Beauty': {
    name: 'Cosmetics',
    price: null,
    category: 'Beauty',
    description: 'Makeup and skincare products',
    image: 'https://cdn.britannica.com/35/222035-131-9FC95B31/makeup-cosmetics.jpg'
  },
  'Bath & Body': {
    name: 'Personal Care',
    price: null,
    category: 'Hygiene',
    description: 'Soaps, shampoos and care products',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzYFZuP_yTYI2GM4HGUgUfqoS4hLb-IcBwg&s'
  },
  'Cleaning Essentials': {
    name: 'Home Care',
    price: null,
    category: 'Cleaning',
    description: 'Detergents and cleaning supplies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYR0DBe0PkLDpNYlaG4wh11zo7qn9hMAsTzw&s'
  },
  'Home Needs': {
    name: 'Home Utility',
    price: null,
    category: 'Home',
    description: 'All household essential products',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0kwe5a2vU6EUSlCaCNVUgulErBeHEvRX0Ng&s'
  },
  'Electricals & Accessories': {
    name: 'Electronics',
    price: null,
    category: 'Electronics',
    description: 'Chargers, cables and accessories',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-G1oRJq3542IcVFFvn-e3LWWkTtPmy7hSw&s'
  },
  'Hygiene & Grooming': {
    name: 'Personal Hygiene',
    price: null,
    category: 'Care',
    description: 'Sanitary and grooming products',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9fy3OtS0kep1FUQIfMCOYJ_wtRpTo7kUCTw&s'
  },
  'Health & Baby Care': {
    name: 'Healthcare',
    price: null,
    category: 'Medical',
    description: 'Medicines and baby care items',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsLdXM2gCBf8pidAEQBte8xGjOdV4MvAPoRg&s'
  },
  
  'Paan Corner': {
    name: 'Paan Products',
    price: null,
    category: 'Special',
    description: 'Paan ingredients and accessories',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8rEzrFiGAcE6rhr70TFC0eDOITSPxU04Jw&s'
  }
};

// Corrected Styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '1400px',
    margin: '20px auto',
    padding: '25px 20px',
    fontFamily: "'Roboto', sans-serif",
    // backgroundColor: '#ffffff',
    // borderRadius: '12px',
    // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#2d3436',
    marginBottom: '18px',
    paddingBottom: '10px',
    borderBottom: '2px solid #dfe6e9',
    maxWidth: '1200px',
    margin: '0 auto 20px'
  },
  gridSectionTitle: { // Fixed this reference
    fontSize: '20px',
    fontWeight: 600,
    color: '#2d3436',
    margin: '30px auto 20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #dfe6e9',
    maxWidth: '1200px',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '28px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  },
  item: {
    padding: '10px 22px',
    backgroundColor: '#f8f9fa',
    borderRadius: '24px',
    fontSize: '15px',
    color: '#2d3436',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #dfe6e9',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  },
  gridItem: {
    padding: '14px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #dfe6e9',
  },
  gridText: {
    fontSize: '15px',
    color: '#2d3436',
    fontWeight: 400,
    lineHeight: 1.4
  }
};


// Modal Styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    width: '90%',
    maxWidth: '700px',
    position: 'relative',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
  },
  closeButton: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    fontSize: '28px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#2d3436',
    padding: '0 8px',
    borderRadius: '50%',
    ':hover': {
      backgroundColor: '#dfe6e9'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  image: {
    width: '250px',
    height: '250px',
    borderRadius: '12px',
    objectFit: 'cover',
    flexShrink: 0
  },
  details: {
    flex: 1,
    minWidth: 0
  },
  productName: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#2d3436',
    fontWeight: 600
  },
  price: {
    fontSize: '22px',
    color: '#e17055',
    marginBottom: '12px',
    fontWeight: 500
  },
  category: {
    fontSize: '16px',
    color: '#636e72',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  description: {
    fontSize: '16px',
    color: '#2d3436',
    lineHeight: 1.6,
    marginBottom: '25px'
  },
  addToCart: {
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#00cec9',
      transform: 'translateY(-2px)'
    }
  }
};

export default PopularSearch;