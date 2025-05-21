import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaHome, FaBriefcase, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddressModal = ({ show, onHide, onSave }) => {
  const navigate = useNavigate();
  const [addressLabel, setAddressLabel] = useState("Home");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [areaName, setAreaName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const addressData = {
        addressLabel,
        phoneNumber,
        email,
        houseNo,
        buildingNo,
        landmark,
        areaName,
        fullAddress: `${houseNo}, ${buildingNo}${landmark ? `, ${landmark}` : ''}, ${areaName}`
      };

      // Call onSave if provided
      if (typeof onSave === "function") {
        onSave(addressData);
      }

      // Navigate to payment page with address data
      navigate('/payment', { state: { addressData } });

      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const resetForm = () => {
    setAddressLabel("Home");
    setPhoneNumber("");
    setEmail("");
    setHouseNo("");
    setBuildingNo("");
    setLandmark("");
    setAreaName("");
    setValidated(false);
  };

  const handleClose = () => {
    resetForm();
    if (typeof onHide === "function") {
      onHide();
    } else {
      console.error("onHide is not a function");
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered 
      size="lg"
      backdrop="static"
      className="address-modal"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaMapMarkerAlt className="title-icon" />
          </motion.div>
          <span>Enter Address Details</span>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="modal-body">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Address Details Section */}
          <section className="form-section">
            <h4 className="section-title">
              <motion.span 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Add Address Details
              </motion.span>
            </h4>
            
            <Row>
              <Col md={6}>
                <Form.Group controlId="houseNo" className="mb-3">
                  <Form.Label className="form-label">
                    <strong>House No. & Floor*</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter house number and floor"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    required
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter house number
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="buildingNo" className="mb-3">
                  <Form.Label className="form-label">
                    <strong>Building & Block No.*</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter building and block number"
                    value={buildingNo}
                    onChange={(e) => setBuildingNo(e.target.value)}
                    required
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter building number
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="landmark" className="mb-3">
              <Form.Label className="form-label">
                <strong>Landmark & Area Name (Optional)</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nearby landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="areaName" className="mb-4">
              <Form.Label className="form-label">
                <strong>Area Name*</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area name"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                required
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                Please enter area name
              </Form.Control.Feedback>
            </Form.Group>
          </section>

          {/* Address Label Section */}
          <section className="form-section">
            <h4 className="section-title">Add Address Label</h4>
            <div className="label-container">
              {[
                { label: "Home", icon: <FaHome /> },
                { label: "Work", icon: <FaBriefcase /> },
                { label: "Other", icon: <FaStar /> }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`label-item ${addressLabel === item.label ? 'active' : ''}`}
                  onClick={() => setAddressLabel(item.label)}
                >
                  <div className="label-icon">{item.icon}</div>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Receiver Details Section */}
          <section className="form-section">
            <h4 className="section-title">Receiver Details</h4>
            
            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label className="form-label">
                <strong>Phone Number*</strong>
              </Form.Label>
              <div className="phone-input-container">
                <div className="country-code">+91</div>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  className="phone-input"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter a valid 10-digit phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-4">
              <Form.Label className="form-label">
                <strong>Email*</strong>
              </Form.Label>
              <div className="email-input-container">
                <FaEnvelope className="email-icon" />
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
          </section>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="submit-button-container"
          >
            <Button 
              variant="primary" 
              type="submit"
              className="submit-button"
            >
              Save & Continue
            </Button>
          </motion.div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Prop validation
AddressModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

// Default props (optional)
AddressModal.defaultProps = {
  onSave: () => console.warn("onSave function not provided to AddressModal"),
  onHide: () => console.warn("onHide function not provided to AddressModal")
};

// CSS Styles
const styles = `
  .address-modal {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    border-radius: 12px;
    overflow: hidden;
  }

  .modal-header {
    border-bottom: none;
    padding: 1.5rem;
    background-color: #f8f9fa;
  }

  .modal-title {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    width: 100%;
  }

  .title-icon {
    margin-right: 12px;
    color: #6c5ce7;
    font-size: 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
    color: #2d3436;
  }

  .form-section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: #2d3436;
  }

  .form-input {
    border-radius: 10px;
    padding: 0.875rem 1rem;
    border: 2px solid #dfe6e9;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .form-input:focus {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  }

  .label-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .label-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.125rem 0.625rem;
    border: 2px solid #dfe6e9;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #ffffff;
    color: #636e72;
  }

  .label-item.active {
    border-color: #6c5ce7;
    background-color: #f7f5ff;
    color: #6c5ce7;
  }

  .label-icon {
    font-size: 1.5rem;
    margin-bottom: 0.625rem;
  }

  .phone-input-container {
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
  }

  .country-code {
    background-color: #f5f6fa;
    padding: 0.875rem 1rem;
    border: 2px solid #dfe6e9;
    border-right: none;
    font-size: 0.95rem;
    color: #636e72;
    font-weight: 500;
  }

  .phone-input {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-left: none !important;
  }

  .email-input-container {
    position: relative;
  }

  .email-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #636e72;
  }

  .email-input {
    padding-left: 2.5rem !important;
  }

  .submit-button-container {
    margin-top: 1.5rem;
    text-align: center;
  }

  .submit-button {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    border-radius: 12px;
    padding: 1rem 1.875rem;
    font-weight: 600;
    font-size: 1rem;
    width: 100%;
    box-shadow: 0 4px 14px rgba(108, 92, 231, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .submit-button:hover {
    background-color: #5649be;
    border-color: #5649be;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
  }

  .submit-button:active {
    transform: translateY(0);
  }

  @media (max-width: 576px) {
    .label-container {
      flex-direction: column;
    }
    
    .modal-header, .modal-body {
      padding: 1rem;
    }
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default AddressModal;