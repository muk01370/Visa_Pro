import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-3">{t('footer.about')}</h5>
            <p className="mb-4">{t('footer.about.text')}</p>
            <div className="d-flex">
              <a href="https://facebook.com" className="me-3 text-white" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="me-3 text-white" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="me-3 text-white" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-white" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-3">{t('footer.links')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  {t('nav.home')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none">
                  {t('nav.about')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blogs" className="text-white text-decoration-none">
                  {t('nav.blogs')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faqs" className="text-white text-decoration-none">
                  {t('nav.faqs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-3">{t('footer.services')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/services" className="text-white text-decoration-none">
                  {t('services.filter.tourist')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-white text-decoration-none">
                  {t('services.filter.student')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-white text-decoration-none">
                  {t('services.filter.work')}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-white text-decoration-none">
                  {t('services.filter.business')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white text-decoration-none">
                  {t('services.filter.permanent')}
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="mb-3">{t('footer.contact')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1" />
                <span>123 Visa Street, Immigration City, 12345</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaPhoneAlt className="me-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>info@visapro.com</span>
              </li>
            </ul>
            
            <h5 className="mb-3">{t('footer.subscribe')}</h5>
            <Form onSubmit={handleSubscribe}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder={t('footer.subscribe.placeholder')}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                {t('footer.subscribe.button')}
              </Button>
            </Form>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">{t('footer.copyright')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;