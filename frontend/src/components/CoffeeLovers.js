import React from "react";

const CoffeeLovers = () => {
  // Background image option
  const backgroundImage = "https://static.vecteezy.com/system/resources/previews/037/866/143/non_2x/ai-generated-premium-roasted-coffee-beans-on-elegant-black-background-banner-for-coffee-lovers-and-cafes-photo.jpeg";

  // Product data matching the screenshot
  const products = [
    {
      id: 1,
      name: "Vietnamese Cold Coffee",
      size: "450 ml",
      price: "₹189",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-5304-5304,pr-true,f-auto,q-80/cms/product_variant/9bc896d4-229d-45a4-8294-b36f97f5992c/Vietnamese-Cold-Coffee.jpeg"
    },
    {
      id: 2,
      name: "Hot Chocolate",
      size: "250 ml",
      price: "₹135",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/76f7bedc-0cf0-4a64-ae7d-476e187346d8/Hot-Chocolate.jpeg"
    },
    {
      id: 3,
      name: "Classic Cold Coffee",
      size: "350 ml",
      price: "₹135",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/18d502d4-00ba-4533-99e3-ae817db3f361/Classic-Cold-Coffee.jpeg"
    },
    {
      id: 4,
      name: "Hazelnut Cold Coffee",
      size: "350 ml",
      price: "₹169",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/d72f520d-1907-42df-801c-ecd6684106ac/Hazelnut-Cold-Coffee.jpeg"
    },
    {
      id: 5,
      name: "French Vanilla Latte",
      size: "250 ml",
      price: "₹179",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4348-4348,pr-true,f-auto,q-80/cms/product_variant/03dec151-460d-485e-ade8-bc2ea74c42a8/French-Vanilla-Latte.jpeg"
    },
    {
      id: 6,
      name: "Iced Americano",
      size: "300 ml",
      price: "₹149",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4615-4615,pr-true,f-auto,q-80/cms/product_variant/d102ddef-501c-42e4-83ce-8a3d6c972558/Americano.jpeg"
    },
    {
      id: 7,
      name: "Caramel Macchiato",
      size: "350 ml",
      price: "₹199",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4615-4615,pr-true,f-auto,q-80/cms/product_variant/d102ddef-501c-42e4-83ce-8a3d6c972558/Americano.jpeg"
    },
    {
      id: 8,
      name: "Espresso Shot",
      size: "30 ml",
      price: "₹99",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/4e44890d-d561-4972-b190-45b0324acce8/Iced-Americano.jpeg"
    },
    {
      id: 9,
      name: "Mocha Latte",
      size: "350 ml",
      price: "₹189",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4615-4615,pr-true,f-auto,q-80/cms/product_variant/7dc3784d-50ea-4d10-86bf-e7703de5179a/Latte.jpeg"
    },
    {
      id: 10,
      name: "Coconut Cold Brew",
      size: "400 ml",
      price: "₹209",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4615-4615,pr-true,f-auto,q-80/cms/product_variant/3d3c7b5f-5c45-477d-9706-0ef2cf64d7e0/Spanish-Coffee.jpeg"
    },
    {
      id: 11,
      name: "Turkish Coffee",
      size: "150 ml",
      price: "₹129",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-5198-5198,pr-true,f-auto,q-80/cms/product_variant/92790524-02e7-4ca3-8aee-122d2ddc655e/Filter-Coffee.jpeg"
    },
    {
      id: 12,
      name: "Irish Coffee",
      size: "250 ml",
      price: "₹219",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/27b6109e-514e-44d0-8245-ada18e023441/Cappuccino.jpeg"
    },
    {
      id: 13,
      name: "Cinnamon Dolce Latte",
      size: "350 ml",
      price: "₹179",
      stock: "Netify",
      imageUrl: "https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/d72f520d-1907-42df-801c-ecd6684106ac/Hazelnut-Cold-Coffee.jpeg"
    },
    
  ];

  return (
    <div style={{
      fontFamily: "'Arial', sans-serif",
      maxWidth: "100%",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      {/* Combined Header and Products Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        gap: "40px",
        alignItems: "flex-start"
        
      }}>
        {/* Header Content */}
        <div style={{
          width: "250px",
          flexShrink: 0,
          padding: "20px",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            color: "#333",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}>COFFEE LOVERS</h1>
          <p style={{
            color: "#666",
            fontSize: "16px",
            marginBottom: "20px"
          }}>Dive into the world of fresh brew</p>
          <div style={{
            textAlign: "right"
          }}>
            <a href="#" style={{
              color: "#8B4513",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor: "rgba(139, 69, 19, 0.1)",
              padding: "8px 15px",
              borderRadius: "5px",
              display: "inline-block"
            }}>More Items &gt;</a>
          </div>
        </div>

        {/* Horizontal Scrolling Products */}
        <div style={{
          flexGrow: 1,
          overflowX: "auto",
          paddingBottom: "20px",
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "::-webkit-scrollbar": { // Hide scrollbar for Chrome/Safari
            display: "none"
          }
        }}>
          <div style={{
            display: "inline-flex",
            gap: "20px",
            padding: "10px 5px"
          }}>
            {products.map((product) => (
              <div key={product.id} style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                width: "180px",
                flexShrink: 0,
                transition: "transform 0.2s ease",
                ":hover": {
                  transform: "translateY(-5px)"
                }
              }}>
                <div style={{
                  height: "100px",
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                  marginBottom: "10px"
                }}></div>
                <h3 style={{
                  margin: "0 0 5px 0",
                  fontSize: "15px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{product.name}</h3>
                <p style={{
                  margin: "0 0 8px 0",
                  fontSize: "13px",
                  color: "#666"
                }}>{product.size}</p>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontWeight: "bold",
                    fontSize: "15px"
                  }}>{product.price}</span>
                  <span style={{
                    fontSize: "12px",
                    color: "#8B4513"
                  }}>{product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeLovers;