import { useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// Main Application Entry Point (App.tsx)
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for modern green and glass-like UI
const LandingPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #e6ffe6, #ffffff);
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 100px;
`;

const LoginButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.h1`
  color: #2f4f2f;
  font-family: 'Arial', sans-serif;
`;

const LandingPage = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming user metadata contains roles
    if (isAuthenticated && user) {
      const userRole = user['https://your-domain.com/roles'][0]; // Replace with your Auth0 roles path
      setRole(userRole);
      if (userRole === 'Property Manager') {
        navigate('/property-manager-dashboard');
      } else if (userRole === 'Tenant') {
        navigate('/tenant-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <LandingPageContainer>
      <Title>Welcome to Property Management Portal</Title>
      <LoginBox>
        <h2>Login</h2>
        <LoginButton onClick={() => loginWithRedirect()}>Log In with Auth0</LoginButton>
      </LoginBox>
    </LandingPageContainer>
  );
};

export default LandingPage;

//import LandingPage from './landingPage';
//import PropertyManagerDashboard from './PropertyManagerDashboard';
//import TenantDashboard from './TenantDashboard';

const App = () => {
  return (
    <Auth0Provider
      domain="dev-hoempxots7snf8ar.us.auth0.com"
      clientId="5k0OLC5Q7s5MHthaDYVFx7GynDOZl8nn"
      redirectUri={window.location.origin}
      audience="https://dev-hoempxots7snf8ar.us.auth0.com/api/v2/"
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/property-manager-dashboard" element={<PropertyManagerDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;
