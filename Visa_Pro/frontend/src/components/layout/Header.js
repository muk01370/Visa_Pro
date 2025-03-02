import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUser, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import LanguageContext from '../../context/LanguageContext';

const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            {t('app.name')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">{t('nav.home')}</Nav.Link>
              <Nav.Link as={Link} to="/about">{t('nav.about')}</Nav.Link>
              <Nav.Link as={Link} to="/services">{t('nav.services')}</Nav.Link>
              <Nav.Link as={Link} to="/blogs">{t('nav.blogs')}</Nav.Link>
              <Nav.Link as={Link} to="/faqs">{t('nav.faqs')}</Nav.Link>
              <Nav.Link as={Link} to="/contact">{t('nav.contact')}</Nav.Link>
              
              <NavDropdown 
                title={<><FaGlobe className="me-1" /> {language.toUpperCase()}</>} 
                id="language-dropdown"
              >
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('es')}>Español</NavDropdown.Item>
              </NavDropdown>
              
              {isAuthenticated ? (
                <NavDropdown 
                  title={<><FaUser className="me-1" /> {t('nav.admin')}</>} 
                  id="admin-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/admin">{t('admin.dashboard')}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> {t('nav.logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/admin/login">{t('nav.login')}</Nav.Link>
              )}
              
              <Button 
                as={Link} 
                to="/apply" 
                variant="primary" 
                className="ms-lg-3"
              >
                {t('nav.apply')}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;