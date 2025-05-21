import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const VendorUpload = () => {
  // Simplified product state
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean up blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Clean up previous preview if exists
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('image', image);

      await axios.post('/api/vendor/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Product uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProduct({
      name: '',
      price: '',
      category: ''
    });
    removeImage();
  };

  return (
    <Container>
      <Sidebar>
        <VendorProfile>
          <VendorLogo src="https://via.placeholder.com/80" alt="Vendor Logo" />
          <h2>Vendor Dashboard</h2>
        </VendorProfile>
        <Nav>
          <NavItem active>
            <i className="fas fa-upload"></i>
            <span>Upload Product</span>
          </NavItem>
          <NavItem>
            <i className="fas fa-box-open"></i>
            <span>My Products</span>
          </NavItem>
        </Nav>
      </Sidebar>
      
      <MainContent>
        <Header>
          <h1>Upload New Product</h1>
          <HeaderActions>
            <UserDropdown>
              <UserImage src="https://via.placeholder.com/40" alt="User" />
              <span>Vendor Name</span>
            </UserDropdown>
          </HeaderActions>
        </Header>
        
        <UploadContainer>
          <UploadForm onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <i className="fas fa-info-circle"></i>
                <h2>Product Information</h2>
              </SectionTitle>
              
              <FormGroup>
                <label htmlFor="name">Product Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="price">Price*</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="category">Category*</label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Garden</option>
                  </select>
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <i className="fas fa-images"></i>
                <h2>Product Image*</h2>
              </SectionTitle>
              
              {imagePreview ? (
                <ImagePreviewContainer>
                  <PreviewItem>
                    <img src={imagePreview} alt="Product preview" />
                    <RemoveImage onClick={removeImage}>
                      &times;
                    </RemoveImage>
                  </PreviewItem>
                </ImagePreviewContainer>
              ) : (
                <UploadArea onClick={() => fileInputRef.current.click()}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload product image</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </UploadArea>
              )}
            </FormSection>
            
            <FormActions>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Upload Product'}
              </SubmitButton>
            </FormActions>
          </UploadForm>
        </UploadContainer>
      </MainContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f7fb;
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  padding: 20px 0;
`;

const VendorProfile = styled.div`
  text-align: center;
  padding: 20px 10px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 20px;

  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const VendorLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 12px 20px;
  color: ${props => props.active ? '#4361ee' : '#6c757d'};
  background-color: ${props => props.active ? '#e0e7ff' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  i {
    font-size: 18px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const UploadForm = styled.form`
  max-width: 800px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  h2 {
    font-size: 18px;
    font-weight: 600;
  }

  i {
    color: #4361ee;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input, select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: #4361ee;
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;

  > div {
    flex: 1;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #4361ee;
  }

  i {
    font-size: 48px;
    color: #4361ee;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 0;
  }
`;

const ImagePreviewContainer = styled.div`
  margin-top: 20px;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImage = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #f72585;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3f37c9;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export default VendorUpload;