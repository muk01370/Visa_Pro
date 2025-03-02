import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';

const AdminLoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  // If already authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // In a real application, you would call an API to authenticate
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      
      // For demo purposes, we'll just simulate a successful login with hardcoded credentials
      if (email === 'admin@visapro.com' && password === 'admin123') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Call the login function from AuthContext
        login({
          id: '1',
          name: 'Admin User',
          email: 'admin@visapro.com',
          role: 'admin',
          token: 'demo-token-12345'
        });
        
        navigate('/admin');
      } else {
        setError(t('notification.login.error'));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('notification.login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">{t('admin.login.title')}</h2>
                <p className="text-muted">Enter your credentials to access the admin dashboard</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>{t('admin.login.email')}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>{t('admin.login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      t('admin.login.button')
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <a href="/" className="text-decoration-none">
              &larr; Back to Homepage
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLoginPage;