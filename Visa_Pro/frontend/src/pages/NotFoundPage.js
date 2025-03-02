import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <FaExclamationTriangle className="text-warning mb-4" size={80} />
          <h1 className="display-4 fw-bold mb-4">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link to="/" className="btn btn-primary btn-lg px-4">
              Go to Homepage
            </Link>
            <Link to="/contact" className="btn btn-outline-secondary btn-lg px-4">
              Contact Support
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;