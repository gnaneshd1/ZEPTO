import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const LocationModal = ({ show, onHide, onConfirm }) => {
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [validated, setValidated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const deliverableCities = [
    { name: "Bengaluru", pincode: "555888" },
    { name: "Mysuru", pincode: "555999" },
    { name: "Hassan", pincode: "555000" }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const isValidLocation = deliverableCities.some(
      (loc) => loc.name.toLowerCase() === city.toLowerCase() && loc.pincode === pincode
    );

    if (isValidLocation) {
      setSelectedLocation({ city, pincode });
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onConfirm(selectedLocation);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="md" style={modalStyles.modal}>
        <Modal.Header closeButton style={modalStyles.header}>
          <Modal.Title style={modalStyles.title}>
            <FaMapMarkerAlt style={modalStyles.icon} />
            Location Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyles.body}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div style={formStyles.container}>
              <Form.Group controlId="formCity" className="mb-3">
                <Form.Label style={formStyles.label}>City*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={formStyles.input}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a city
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPincode" className="mb-4">
                <Form.Label style={formStyles.label}>Pincode*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  pattern="[0-9]{6}"
                  style={formStyles.input}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 6-digit pincode
                </Form.Control.Feedback>
              </Form.Group>

              <div style={formStyles.buttonContainer}>
                <Button 
                  variant="primary" 
                  type="submit"
                  style={formStyles.checkButton}
                >
                  Check Availability
                </Button>
              </div>
            </div>
          </Form>

          {selectedLocation && (
            <div style={locationCardStyles.container}>
              <div style={locationCardStyles.header}>
                <FaMapMarkerAlt style={locationCardStyles.icon} />
                <div>
                  <div style={locationCardStyles.city}>{selectedLocation.city}</div>
                  <div style={locationCardStyles.pincode}>Pincode: {selectedLocation.pincode}</div>
                </div>
              </div>
              <Button 
                variant="outline-primary" 
                size="sm" 
                onClick={() => setSelectedLocation(null)}
                style={locationCardStyles.changeButton}
              >
                Change Location
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={modalStyles.footer}>
          <Button 
            variant="primary" 
            onClick={handleConfirm}
            style={modalStyles.confirmBtn}
            disabled={!selectedLocation}
          >
            Confirm & Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Animated Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={alertStyles.container}
          >
            <motion.div 
              style={alertStyles.alert}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={alertStyles.content}>
                <div style={alertStyles.iconContainer}>
                  <FaTimes style={alertStyles.icon} />
                </div>
                <div style={alertStyles.textContainer}>
                  <h4 style={alertStyles.title}>Delivery Unavailable</h4>
                  <p style={alertStyles.message}>Not deliverable to this location</p>
                </div>
              </div>
              <motion.div 
                style={alertStyles.progressBar}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Styles
const modalStyles = {
  modal: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    borderBottom: 'none',
    padding: '25px 25px 10px',
    backgroundColor: '#f8f9fa'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    width: '100%'
  },
  icon: {
    marginRight: '12px',
    color: '#8e44ad',
    fontSize: '1.5rem'
  },
  body: {
    padding: '20px 25px',
    color: '#34495e'
  },
  footer: {
    borderTop: 'none',
    padding: '15px 25px 25px',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  confirmBtn: {
    backgroundColor: '#8e44ad',
    borderColor: '#8e44ad',
    borderRadius: '30px',
    padding: '10px 30px',
    fontWeight: '500',
    fontSize: '1rem',
    boxShadow: '0 2px 10px rgba(142, 68, 173, 0.3)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#7d3c98',
      borderColor: '#7d3c98',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(142, 68, 173, 0.4)'
    },
    ':active': {
      transform: 'translateY(0)'
    },
    ':disabled': {
      backgroundColor: '#bdc3c7',
      borderColor: '#bdc3c7'
    }
  }
};

const formStyles = {
  container: {
    padding: '0 10px'
  },
  label: {
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: '8px',
    fontSize: '0.95rem'
  },
  input: {
    borderRadius: '8px',
    padding: '12px 15px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#8e44ad',
      boxShadow: '0 0 0 0.2rem rgba(142, 68, 173, 0.25)'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  checkButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
    borderRadius: '30px',
    padding: '10px 25px',
    fontWeight: '500',
    fontSize: '0.95rem',
    boxShadow: '0 2px 10px rgba(52, 152, 219, 0.3)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#2980b9',
      borderColor: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)'
    },
    ':active': {
      transform: 'translateY(0)'
    }
  }
};

const locationCardStyles = {
  container: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  icon: {
    color: '#8e44ad',
    fontSize: '1.5rem'
  },
  city: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '1.1rem'
  },
  pincode: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginTop: '3px'
  },
  changeButton: {
    borderRadius: '20px',
    padding: '5px 15px',
    borderColor: '#8e44ad',
    color: '#8e44ad',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#f3e6f8',
      borderColor: '#7d3c98',
      color: '#7d3c98'
    }
  }
};

const alertStyles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    width: "100%",
    maxWidth: "400px",
    padding: "0 20px",
    pointerEvents: "none"
  },
  alert: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(231, 76, 60, 0.3)",
    overflow: "hidden",
    pointerEvents: "auto"
  },
  content: {
    display: "flex",
    alignItems: "center",
    padding: "20px"
  },
  iconContainer: {
    backgroundColor: "#e74c3c",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
    flexShrink: 0
  },
  icon: {
    color: "#fff",
    fontSize: "20px"
  },
  textContainer: {
    flex: 1
  },
  title: {
    color: "#e74c3c",
    margin: "0 0 5px 0",
    fontSize: "18px"
  },
  message: {
    color: "#7f8c8d",
    margin: 0,
    fontSize: "14px"
  },
  progressBar: {
    height: "4px",
    backgroundColor: "#e74c3c",
    width: "100%"
  }
};

export default LocationModal;