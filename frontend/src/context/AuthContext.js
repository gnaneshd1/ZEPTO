import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      // Validate using actual MongoDB fields
      if (parsedUser?._id && parsedUser?.email) {
        // Create display name from available fields
        return {
          ...parsedUser,
          name: `${parsedUser.firstName} ${parsedUser.lastName}` || parsedUser.email
        };
      } else {
        console.error('Invalid user fields in localStorage');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error parsing user:', error);
      localStorage.removeItem('user');
    }
  }
  return null;
});

  // Login function
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};