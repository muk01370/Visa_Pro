import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ProgressBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ApplicationPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    serviceType: '',
    documents: []
  });
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setStep(step + 1);
    setValidated(false);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    try {
      // In a real application, you would submit the form data to your backend here
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/applications`, formData);
      
      // For demo purposes, we'll just simulate a successful submission
      setTimeout(() => {
        setSubmitted(true);
      }, 1500);
    } catch (err) {
      setError('There was an error submitting your application. Please try again later.');
      console.error('Error submitting application:', err);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="mb-4">{t('apply.step1')}</h3>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="fullName">
                  <Form.Label>{t('apply.form.name')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="email">
                  <Form.Label>{t('apply.form.email')}</Form.Label>
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
              <Col md={6} className="mb-3">
                <Form.Group controlId="phone">
                  <Form.Label>{t('apply.form.phone')}</Form.Label>
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
              <Col md={6} className="mb-3">
                <Form.Group controlId="nationality">
                  <Form.Label>{t('apply.form.nationality')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="passportNumber">
                  <Form.Label>{t('apply.form.passport')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary">
                {t('apply.form.next')}
              </Button>
            </div>
          </Form>
        );
      case 2:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="mb-4">{t('apply.step2')}</h3>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="serviceType">
                  <Form.Label>{t('apply.form.service')}</Form.Label>
                  <Form.Select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="tourist">Tourist Visa</option>
                    <option value="student">Student Visa</option>
                    <option value="work">Work Permit</option>
                    <option value="business">Business Visa</option>
                    <option value="permanent">Permanent Residency</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={prevStep}>
                {t('apply.form.prev')}
              </Button>
              <Button type="submit" variant="primary">
                {t('apply.form.next')}
              </Button>
            </div>
          </Form>
        );
      case 3:
        return (
          <Form noValidate validated={validated} onSubmit={nextStep}>
            <h3 className="mb-4">{t('apply.step3')}</h3>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="documents">
                  <Form.Label>{t('apply.form.documents')}</Form.Label>
                  <Form.Control
                    type="file"
                    name="documents"
                    onChange={handleFileChange}
                    multiple
                    required
                  />
                  <Form.Text className="text-muted">
                    {t('apply.form.documents.help')}
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {t('validation.required')}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={prevStep}>
                {t('apply.form.prev')}
              </Button>
              <Button type="submit" variant="primary">
                {t('apply.form.next')}
              </Button>
            </div>
          </Form>
        );
      case 4:
        return (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 className="mb-4">{t('apply.step4')}</h3>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.name')}</p>
                    <p>{formData.fullName}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.email')}</p>
                    <p>{formData.email}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.phone')}</p>
                    <p>{formData.phone}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.nationality')}</p>
                    <p>{formData.nationality}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.passport')}</p>
                    <p>{formData.passportNumber}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="mb-1 fw-bold">{t('apply.form.service')}</p>
                    <p>{formData.serviceType}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <p className="mb-1 fw-bold">{t('apply.form.documents')}</p>
                    <p>
                      {formData.documents.length > 0
                        ? Array.from(formData.documents).map((file, index) => (
                            <span key={index} className="d-block">
                              {file.name}
                            </span>
                          ))
                        : 'No documents uploaded'}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={prevStep}>
                {t('apply.form.prev')}
              </Button>
              <Button type="submit" variant="primary">
                {t('apply.form.submit')}
              </Button>
            </div>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-3">{t('apply.title')}</h1>
              <p className="lead">{t('apply.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Application Form */}
      <section className="py-5">
        <Container>
          {submitted ? (
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <div className="bg-light p-5 rounded shadow-sm">
                  <h2 className="text-success mb-4">{t('apply.success.title')}</h2>
                  <p className="lead">{t('apply.success.text')}</p>
                  <Button variant="primary" href="/" className="mt-3">
                    {t('button.readmore')}
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col lg={8}>
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                <Card className="shadow-sm">
                  <Card.Body className="p-4">
                    <ProgressBar 
                      now={(step / 4) * 100} 
                      className="mb-4" 
                      variant="primary" 
                    />
                    {renderStep()}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default ApplicationPage;