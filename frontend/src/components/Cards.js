// import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const cardData = [
//   { 
//     id: 1,
//     // title: 'Cafe',
//     category: "Cafe",
//     image: 'https://cdn.zeptonow.com/production/cms/category/031c2a24-d40f-4272-8c71-8a566252495e.png'
//   },
//   { 
//     id: 2,
//     // title: 'Home',
//     category: "Home",
//     image: 'https://cdn.zeptonow.com/production/cms/category/b322b3db-e75e-45e5-a11d-7ee37561c426.png'
//   },
//   { 
//     id: 3,
//     // title: 'Toys',
//     category: "Toys",
//     image: 'https://cdn.zeptonow.com/production/cms/category/8d4fb022-bae0-432d-92c8-2b12d97ee6cc.png'
//   },
//   { 
//     id: 4,
//     // title: 'Fresh',
//     category: "Fresh",
//     image: 'https://cdn.zeptonow.com/production/cms/category/38047553-95f3-47c6-a1ff-4794e1227d3a.png'
//   },
//   { 
//     id: 5,
//     // title: 'Electronics',
//     category: "Electronics",
//     image: 'https://cdn.zeptonow.com/production/cms/category/c084c75c-82ca-497f-857c-5069c6723194.png'
//   },
 
//   { 
//     id: 7,
//     // title: 'Beauty',
//     category: "Beauty",
//     image: 'https://cdn.zeptonow.com/production/cms/category/d1127e88-d743-457a-a588-489267297de4.png'
//   },
  
//   { 
//     id: 9,
//     // title: 'Deal Zone',
//     category: "Deal Zone",
//     image: 'https://cdn.zeptonow.com/production/cms/category/366e5b7d-2028-4935-b9f1-75bfa085c3d7.png'
//   },
//   { 
//     id: 10,
//     // title: 'Baby Store',
//     category: "Baby Store",
//     image: 'https://cdn.zeptonow.com/production/cms/category/227b70d5-d1cf-428b-a276-1392c5067eb3.png'
//   },
//   { 
//     id: 6,
//     // title: 'Mobiles',
//     category: "Mobiles",
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMFfDoFFLtrb5G1erRat_I4OqU1kyoE5mG2g&s'
//   },
//   { 
//     id: 8,
//     // title: 'Fashion',
//     category: "Fashion",
//     image: 'https://cdn.zeptonow.com/production/tr:w-300,ar-632-480,pr-true,f-auto,q-80/inventory/banner/db0f1654-301f-4a6f-9d9a-0cab9606456a.png'
//   },
 
// ];

// function Cards({ onCategorySelect }) {
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const checkScroll = () => {
//     const el = scrollRef.current;
//     if (el) {
//       setCanScrollLeft(el.scrollLeft > 0);
//       setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
//     }
//   };

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = scrollRef.current.offsetWidth * 0.8;
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleCardClick = (category) => {
//     setSelectedCategory(category);
//     if (onCategorySelect) {
//       onCategorySelect(category);
//     }
//     // Navigate to products page with category filter
//     navigate(`/products?category=${encodeURIComponent(category)}`);
//   };

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (el) {
//       el.addEventListener('scroll', checkScroll);
//       checkScroll();
//     }
//     return () => el?.removeEventListener('scroll', checkScroll);
//   }, []);

//   const styles = {
//     wrapper: {
//       position: 'relative',
//       padding: '20px 0px',
//     },
//     scrollContainer: {
//       display: 'flex',
//       overflowX: 'auto',
//       gap: '16px',
//       scrollBehavior: 'smooth',
//       padding: '10px 40px',
//       scrollbarWidth: 'none',
//       msOverflowStyle: 'none',
//     },
//     card: {
//       minWidth: '100px',
//       flexShrink: 0,
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'transform 0.2s',
//       transform: selectedCategory ? 'scale(1)' : 'scale(1)',
//       borderBottom: selectedCategory ? '2px solid #a000c8' : 'none',
//       '&:hover': {
//         transform: 'scale(1.05)'
//       }
//     },
//     selectedCard: {
//       minWidth: '100px',
//       flexShrink: 0,
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'transform 0.2s',
//       transform: 'scale(1.05)',
//       borderBottom: '2px solid #a000c8',
//     },
//     image: {
//       width: '110px',
//       height: '160px',
//       borderRadius: '10%',
//       objectFit: 'cover',
//       marginBottom: '8px',
//       boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
//     },
//     title: {
//       fontSize: '14px',
//       fontWeight: '500',
//       whiteSpace: 'nowrap',
//       color: selectedCategory ? '#a000c8' : '#555',
//     },
//     arrowBtn: {
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       background: 'gray',
//       border: 'none',
//       fontSize: '24px',
//       cursor: 'pointer',
//       borderRadius: '50%',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
//       padding: '8px 12px',
//       zIndex: 1,
//       opacity: 0.8,
//     },
//     leftBtn: { left: '0' },
//     rightBtn: { right: '0' },
//   };

//   return (
//     <div style={styles.wrapper}>
//       {canScrollLeft && (
//         <button style={{ ...styles.arrowBtn, ...styles.leftBtn }} onClick={() => scroll('left')}>
//           ‹
//         </button>
//       )}
//       <div
//         style={{ ...styles.scrollContainer }}
//         ref={scrollRef}
//       >
//         {cardData.map((card) => (
//           <div 
//             key={card.id} 
//             style={card.category === selectedCategory ? styles.selectedCard : styles.card}
//             onClick={() => handleCardClick(card.category)}
//           >
//             <img src={card.image} alt={card.title} style={styles.image} />
//             <div style={{ 
//               ...styles.title,
//               color: card.category === selectedCategory ? '#a000c8' : '#555',
//               fontWeight: card.category === selectedCategory ? 'bold' : '500'
//             }}>
//               {card.title}
//             </div>
//           </div>
//         ))}
//       </div>
//       {canScrollRight && (
//         <button style={{ ...styles.arrowBtn, ...styles.rightBtn }} onClick={() => scroll('right')}>
//           ›
//         </button>
//       )}
//     </div>
//   );
// }

// export default Cards;












import React, { useRef, useState, useEffect } from 'react';

const cardData = [
  { 
    id: 1,
    category: "Cafe",
    image: 'https://cdn.zeptonow.com/production/cms/category/031c2a24-d40f-4272-8c71-8a566252495e.png'
  },
  { 
    id: 2,
    category: "Home",
    image: 'https://cdn.zeptonow.com/production/cms/category/b322b3db-e75e-45e5-a11d-7ee37561c426.png'
  },
  { 
    id: 3,
    category: "Toys",
    image: 'https://cdn.zeptonow.com/production/cms/category/8d4fb022-bae0-432d-92c8-2b12d97ee6cc.png'
  },
  { 
    id: 4,
    category: "Fresh",
    image: 'https://cdn.zeptonow.com/production/cms/category/38047553-95f3-47c6-a1ff-4794e1227d3a.png'
  },
  { 
    id: 5,
    category: "Electronics",
    image: 'https://cdn.zeptonow.com/production/cms/category/c084c75c-82ca-497f-857c-5069c6723194.png'
  },
  { 
    id: 6,
    category: "Mobiles",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMFfDoFFLtrb5G1erRat_I4OqU1kyoE5mG2g&s'
  },
  { 
    id: 7,
    category: "Beauty",
    image: 'https://cdn.zeptonow.com/production/cms/category/d1127e88-d743-457a-a588-489267297de4.png'
  },
  { 
    id: 8,
    category: "Fashion",
    image: 'https://cdn.zeptonow.com/production/tr:w-300,ar-632-480,pr-true,f-auto,q-80/inventory/banner/db0f1654-301f-4a6f-9d9a-0cab9606456a.png'
  },
  { 
    id: 9,
    category: "Deal Zone",
    image: 'https://cdn.zeptonow.com/production/cms/category/366e5b7d-2028-4935-b9f1-75bfa085c3d7.png'
  },
  { 
    id: 10,
    category: "Baby Store",
    image: 'https://cdn.zeptonow.com/production/cms/category/227b70d5-d1cf-428b-a276-1392c5067eb3.png'
  }
];

function Cards({ onCategorySelect, selectedCategory }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    if (onCategorySelect) {
      onCategorySelect(newCategory);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const styles = {
    wrapper: {
      position: 'relative',
      padding: '20px 0px',
    },
    scrollContainer: {
      display: 'flex',
      overflowX: 'auto',
      gap: '16px',
      scrollBehavior: 'smooth',
      padding: '10px 40px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    card: {
      minWidth: '100px',
      flexShrink: 0,
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      // borderBottom: '2px solid transparent',
      // opacity: 0.7,
      '&:hover': {
        transform: 'scale(1.05)',
        opacity: 1
      }
    },
    selectedCard: {
      minWidth: '100px',
      flexShrink: 0,
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      transform: 'scale(1.05)',
      borderBottom: '2px solid #a000c8',
      opacity: 1,
      fontWeight: 'bold'
    },
    image: {
      width: '110px',
      height: '160px',
      borderRadius: '10%',
      objectFit: 'cover',
      marginBottom: '8px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '14px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      color: '#555',
    },
    selectedTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      color: '#a000c8',
    },
    arrowBtn: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'gray',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      borderRadius: '50%',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      padding: '8px 12px',
      zIndex: 1,
      opacity: 0.8,
    },
    leftBtn: { left: '0' },
    rightBtn: { right: '0' },
  };

  return (
    <div style={styles.wrapper}>
      {canScrollLeft && (
        <button style={{ ...styles.arrowBtn, ...styles.leftBtn }} onClick={() => scroll('left')}>
          ‹
        </button>
      )}
      <div style={styles.scrollContainer} ref={scrollRef}>
        {cardData.map((card) => (
          <div 
            key={card.id} 
            style={card.category === selectedCategory ? styles.selectedCard : styles.card}
            onClick={() => handleCardClick(card.category)}
          >
            <img src={card.image} alt={card.category} style={styles.image} />
            <div style={card.category === selectedCategory ? styles.selectedTitle : styles.title}>
              {card.category}
            </div>
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button style={{ ...styles.arrowBtn, ...styles.rightBtn }} onClick={() => scroll('right')}>
          ›
        </button>
      )}
    </div>
  );
}

export default Cards;