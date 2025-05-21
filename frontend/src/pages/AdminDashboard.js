// D:\ZEPTO\frontend\src\pages\admindashbord.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px) rotateX(45deg); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) rotateX(0); 
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.bgImage ? `url(${props.bgImage})` : 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'};
  background-size: ${props => props.bgImage ? 'cover' : '400% 400%'};
  background-position: center;
  background-repeat: no-repeat;
  animation: ${props => !props.bgImage && gradientShift} 15s ease infinite;
  padding: 20px;
  overflow: hidden;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  perspective: 1000px;
`;

const Card = styled.div`
  position: relative;
  width: 320px;
  height: 220px;
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.15)'};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: ${fadeIn} 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.05)
      );
      animation: ${pulse} 2s infinite;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const RippleEffect = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  transform: scale(0);
  animation: ${ripple} 0.6s linear;
  pointer-events: none;
`;

const CardIcon = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 15px 0;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardValue = styled.p`
  font-size: 42px;
  margin: 0;
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const CardDescription = styled.p`
  font-size: 15px;
  margin: 15px 0 0 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
`;

const Particles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, ${props => props.opacity || '0.5'});
  border-radius: 50%;
  animation: ${float} ${props => props.duration || '15s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const AdminDashboard = () => {
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // Background image URL - replace with your desired image URL
  const backgroundImageUrl = 'https://bootstrapget.com/demos/zepto-restaurant-admin-dashboard/assets/images/food/1.png';

  useEffect(() => {
    // Create particles for background
    const particlesArray = [];
    for (let i = 0; i < 20; i++) {
      particlesArray.push({
        id: i,
        size: Math.random() * 5 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10 + 's',
        delay: Math.random() * 5 + 's'
      });
    }
    setParticles(particlesArray);
  }, []);

  const handleCardClick = (cardType, e) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: Math.max(rect.width, rect.height)
    };
    
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    // Navigate to AdminMainPage when Requests card is clicked
    if (cardType === 'Requests') {
      navigate('/AdminMainPage');
    }
    if (cardType === 'Orders') {
      navigate('/OrderList');
    }
  };

  return (
    <DashboardContainer bgImage={backgroundImageUrl}>
      <Particles>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              animationDuration: particle.duration,
              animationDelay: particle.delay
            }}
          />
        ))}
      </Particles>
      
      <CardsContainer>
        <Card 
          bgColor="rgba(78, 115, 223, 0.7)" 
          delay="0.2s"
          onClick={(e) => handleCardClick('Requests', e)}
        >
          {ripples.map(ripple => (
            <RippleEffect
              key={ripple.id}
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size
              }}
            />
          ))}
          <CardIcon delay="0.2s">📨</CardIcon>
          <CardTitle>Requests</CardTitle>
          {/* <CardValue>24</CardValue> */}
          <CardDescription>New requests pending your approval</CardDescription>
        </Card>
        
        <Card 
          bgColor="rgba(28, 200, 138, 0.7)" 
          delay="0.4s"
          onClick={(e) => handleCardClick('Orders', e)}
        >
          {ripples.map(ripple => (
            <RippleEffect
              key={ripple.id}
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size
              }}
            />
          ))}
          <CardIcon delay="0.4s">📦</CardIcon>
          <CardTitle>Orders</CardTitle>
          {/* <CardValue>156</CardValue> */}
          <CardDescription>Orders processed </CardDescription>
        </Card>
      </CardsContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;