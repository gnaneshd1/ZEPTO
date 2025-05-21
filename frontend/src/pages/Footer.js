import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  const navigate = useNavigate();

  const socialLinks = {
    instagram: 'https://www.instagram.com/zeptonow/',
    facebook: 'https://www.facebook.com/Zeptonow/',
    twitter: 'https://x.com/ZeptoNow',
    linkedin: 'https://www.linkedin.com/company/zeptonow/',
    playStore: 'https://play.google.com/store/apps/details?id=com.zeptoconsumerapp',
    appleStore: 'https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645'
  };

  // Internal routes
  const internalRoutes = {
    home: '/',
    login: '/login',
    // addressModal: 'https://www.zeptonow.com/del-areas',
    admin: '/vendor'
  };

  // External links
  const externalLinks = {
    careers: 'https://zepto.talentrecruit.com/career-page',
    support: 'https://www.zeptonow.com/customer-support',
    press: 'https://www.zeptonow.com/press',
    privacy: 'https://www.zeptonow.com/privacy-policy',
    terms: 'https://www.zeptonow.com/privacy-policy',
    disclosure: 'https://www.zeptonow.com/responsible-disclosure-policy',
    blog: 'https://blog.zeptonow.com/',
    security: 'https://www.zepto-reactions-processories.com/security',
    DeliveryAreas: 'https://www.zeptonow.com/del-areas'
  }

  // Navigation handler for internal routes
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  return (
    <div style={styles.container}>
      {/* Top Section */}
      <div style={styles.topSection}>
        
        {/* Left Section - Logo & Social Media */}
            <div style={styles.leftSection}>
              <Link to={internalRoutes.home}>
                <img 
                  src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.72.2/images/logo.svg" 
                  alt="Zepto" 
                  style={styles.logo}
                />
              </Link>
              <div style={styles.socialIcons}>
                <a href={socialLinks.instagram} 
                  aria-label="Instagram" 
                  style={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer">
                  <AiFillInstagram />
                </a>
                <a href={socialLinks.facebook} 
                  aria-label="Facebook" 
                  style={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer">
                  <AiFillFacebook />
                </a>
                <a href={socialLinks.twitter} 
                  aria-label="Twitter" 
                  style={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer">
                  <AiOutlineTwitter />
                </a>
                <a href={socialLinks.linkedin} 
                  aria-label="LinkedIn" 
                  style={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer">
                  <AiFillLinkedin />
                </a>
              </div>
            </div>

        {/* Center Section - Navigation Links */}
        <div style={styles.centerSection}>
          <div style={styles.companyName}>Kiri Technologies Private Limited</div>
          <div style={styles.linksContainer}>
            <div style={styles.linkColumn}>
              <button onClick={() => handleNavigation(internalRoutes.home)} style={styles.linkButton}>
                Home
              </button>
              <a href={externalLinks.DeliveryAreas} style={styles.link} target="_blank" rel="noopener noreferrer">
                Delivery Areas
              </a>
              <a href={externalLinks.careers} style={styles.link} target="_blank" rel="noopener noreferrer">
                Careers
              </a>
              <a href={externalLinks.support} style={styles.link} target="_blank" rel="noopener noreferrer">
                Customer Support
              </a>
              <a href={externalLinks.press} style={styles.link} target="_blank" rel="noopener noreferrer">
                Press
              </a>
            </div>
            <div style={styles.linkColumn}>
              <a href={externalLinks.privacy} style={styles.link} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <a href={externalLinks.terms} style={styles.link} target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>
              <a href={externalLinks.disclosure} style={styles.link} target="_blank" rel="noopener noreferrer">
                Responsible Disclosure Policy
              </a>
              <a href={externalLinks.blog} style={styles.link} target="_blank" rel="noopener noreferrer">
                Mojo - a Zepto Blog
              </a>
              <button onClick={() => handleNavigation(internalRoutes.admin)} style={styles.linkButton}>
                Sell on Zepto
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - App Downloads */}
        <div style={styles.rightSection}>
          <div style={styles.appButtons}>
            <a href={socialLinks.playStore} style={styles.storeLink} target="_blank" rel="noopener noreferrer">
              <div style={styles.storeButton}>
                <FaGooglePlay style={styles.storeIcon} />
                <div>
                  <div style={styles.getText}>GET IT ON</div>
                  <div style={styles.storeText}>Google Play</div>
                </div>
              </div>
            </a>
            <a href={socialLinks.appleStore} style={styles.storeLink} target="_blank" rel="noopener noreferrer">
              <div style={styles.storeButton}>
                <FaApple style={styles.storeIcon} />
                <div>
                  <div style={styles.getText}>Download on</div>
                  <div style={styles.storeText}>App Store</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Security Info */}
      <div style={styles.bottomSection}>
        <a href={externalLinks.security} style={styles.securityLink} target="_blank" rel="noopener noreferrer">
          Security Verification & Compliance Information
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // backgroundColor: '#ffffff',
    padding: '40px 20px',
    // borderTop: '1px solid #f0f0f0',
    fontFamily: "'Arial', sans-serif",
    maxWidth: '1400px',
    margin: '0 auto',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '30px'
  },
  leftSection: {
    minWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  logo: {
    width: '180px',
    height: 'auto'
  },
  socialIcons: {
    display: 'flex',
    gap: '25px',
    fontSize: '24px',
    color: '#666'
  },
  socialLink: {
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#000'
    }
  },
  centerSection: {
    flex: 1,
    maxWidth: '600px',
    padding: '0 30px'
  },
  companyName: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    fontWeight: '500',
    textAlign: 'center'
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    flexWrap: 'wrap'
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    minWidth: '200px'
  },
  link: {
    color: '#666',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '14px',
    textAlign: 'left',
    padding: 0,
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#000'
    }
  },
  rightSection: {
    minWidth: '250px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  appButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  storeLink: {
    textDecoration: 'none'
  },
  storeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '12px 20px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#eee'
    }
  },
  storeIcon: {
    fontSize: '24px',
    color: '#333'
  },
  getText: {
    fontSize: '10px',
    color: '#666'
  },
  storeText: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500'
  },
  bottomSection: {
    textAlign: 'center',
    color: '#999',
    fontSize: '12px',
    borderTop: '1px solid #eee',
    paddingTop: '20px'
  },
  securityLink: {
    color: '#999',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#666'
    }
  }
};

export default Footer;