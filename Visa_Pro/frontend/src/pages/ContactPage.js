import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import axios from 'axios';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setLoading(true);
    
    try {
      // API call to submit the form
      await axios.post(`${process.env.REACT_APP_API_URL}/inquiries`, formData);
      
      setSubmitStatus({
        submitted: true,
        success: true,
        message: t('notification.form.success')
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setValidated(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: t('notification.form.error')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-3">{t('contact.title')}</h1>
              <p className="lead">{t('contact.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={7} className="mb-5 mb-lg-0">
              <h2 className="mb-4">Get in Touch</h2>
              
              {submitStatus.submitted && (
                <Alert variant={submitStatus.success ? 'success' : 'danger'} className="mb-4">
                  {submitStatus.message}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.form.name')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {t('validation.required')}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.form.email')}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {t('validation.email')}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.form.phone')}</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {t('validation.phone')}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.form.service')}</Form.Label>
                      <Form.Select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">{t('services.filter.all')}</option>
                        <option value="tourist">{t('services.filter.tourist')}</option>
                        <option value="student">{t('services.filter.student')}</option>
                        <option value="work">{t('services.filter.work')}</option>
                        <option value="business">{t('services.filter.business')}</option>
                        <option value="permanent">{t('services.filter.permanent')}</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {t('validation.required')}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>{t('contact.form.message')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    t('contact.form.submit')
                  )}
                </Button>
              </Form>
            </Col>
            
            <Col lg={5}>
              <div className="ps-lg-5">
                <h2 className="mb-4">Contact Information</h2>
                
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <div className="d-flex mb-4">
                      <div className="me-3">
                        <FaMapMarkerAlt className="text-primary" size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1">{t('contact.info.address')}</h5>
                        <p className="mb-0">123 Visa Street, Immigration City, 12345</p>
                      </div>
                    </div>
                    
                    <div className="d-flex mb-4">
                      <div className="me-3">
                        <FaPhoneAlt className="text-primary" size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1">{t('contact.info.phone')}</h5>
                        <p className="mb-0">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="d-flex mb-4">
                      <div className="me-3">
                        <FaEnvelope className="text-primary" size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1">{t('contact.info.email')}</h5>
                        <p className="mb-0">info@visapro.com</p>
                      </div>
                    </div>
                    
                    <div className="d-flex">
                      <div className="me-3">
                        <FaClock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1">{t('contact.info.hours')}</h5>
                        <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="mb-0">Saturday: 10:00 AM - 2:00 PM</p>
                        <p className="mb-0">Sunday: Closed</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
                {/* Map */}
                <div className="map-container rounded shadow-sm overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1622568796212!5m2!1sen!2sca"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;