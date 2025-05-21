import React, { useState } from "react";

const MoreToLove = () => {
  const [categories, setCategories] = useState([
    { name: "Mobile Accessories", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/36505655-0b0e-4b7c-abdc-92c7a230c267.png" },
    { name: "Home Appliances", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/f87c5de9-c5d1-4bc4-8c5f-fd8342f8dde2.png" },
    { name: "Eyewear & More", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/b230aa9e-39d2-48cf-b70b-62b7345af476.png" },
    { name: "Blocks & Puzzles", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/690d68be-0302-4138-b48a-b2d2141c092a.png" },
    { name: "Bags & Accessories", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/be289cce-726b-4263-82a3-01c04168467a.png" },
    { name: "Pet Treats & Toys", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/22ecab4a-1793-4b4c-a125-ba3dd2869398.png" },
    { name: "Speakers & More", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/5c143c45-988e-4eb3-a7f8-90245c6d5e12.png" },
    { name: "Battery Extensions", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/2a1050dd-b821-480a-8661-205fbeecaff9.png" },
    { name: "Crafts & Hobby", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/86abb79d-0f88-47c7-814a-4f363d6f780f.png" },
    { name: "Kitchen Appliances", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/8a2b7d4f-8e95-4f2e-9007-e65cdaafde88.png" },
    { name: "Card & Board Gam...", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/11cbcab8-f25e-49dd-92ba-62de2f8ad7b9.png" },
    { name: "Earbuds & More", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/609cfe73-8f8d-4700-bb5b-afd4c0851b7e.png" },
    { name: "Massagers & More", image: "https://cdn.zeptonow.com/production/tr:w-336,ar-336-496,pr-true,f-auto,q-80/inventory/banner/ef68d97b-5786-434b-a554-562be8b5877e.png" },
   
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [bgImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95nV2jhZ0ZFJ24lQ6963tul9tSRitBRcE-g&s");

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index) => {
    if (draggedItem === null || draggedItem === index) return;
    
    const newCategories = [...categories];
    const draggedCategory = newCategories[draggedItem];
    
    newCategories.splice(draggedItem, 1);
    newCategories.splice(index, 0, draggedCategory);
    
    setCategories(newCategories);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div style={{
      fontFamily: "'Arial', sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex", // Added flex container
      alignItems: "center", // Vertically center items
      gap: "30px" // Space between title and products
    }}>
      {/* Left Section - Title */}
      <div style={{
        flex: "0 0 200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <p style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#333",
        //   writingMode: "vertical-rl",
        //   transform: "rotate(180deg)",
          textAlign: "center",
          alignSelf: "center"
        }}>MORE TO LOVE</p>
        
        <h2 style={{
          fontSize: "16px",
          color: "#666",
          textAlign: "center",
          marginTop: "20px"
        }}>Explore more &<br/>uncover hidden gems</h2>
      </div>

      {/* Right Section - Products */}
      <div style={{
        flex: "1",
        display: "flex",
        overflowX: "auto",
        gap: "15px",
        padding: "10px 5px",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 transparent",
        "&::-webkit-scrollbar": {
          height: "8px"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px"
        }
      }}>
        {categories.map((category, index) => (
          <div 
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDragEnd={handleDragEnd}
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: "move",
              transition: "transform 0.2s",
              transform: draggedItem === index ? "scale(1.05)" : "none",
              opacity: draggedItem === index ? "0.8" : "1",
              flex: "0 0 auto",
              width: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img 
              src={category.image} 
              alt={category.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                marginBottom: "10px",
                borderRadius: "4px"
              }}
            />
            <p style={{
              margin: "0",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333"
            }}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreToLove;