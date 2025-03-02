import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Accordion, Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPassport, FaUniversity, FaBriefcase, FaBuilding, FaHome, FaArrowLeft, FaCheck, FaInfoCircle, FaDollarSign, FaClock } from 'react-icons/fa';

const ServiceDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/services/${id}`);
        setService(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        if (id === '1') {
          setService({
            _id: '1',
            title: 'Tourist Visas',
            description: 'Explore new destinations with our tourist visa services. We help you navigate the application process for short-term visits to countries worldwide.',
            category: 'tourist',
            icon: 'passport',
            features: [
              'Fast processing times',
              'Document preparation assistance',
              'Application review',
              'Interview preparation'
            ],
            eligibility: 'Valid passport with at least 6 months validity, proof of sufficient funds, travel itinerary, accommodation details, and return ticket.',
            process: 'Initial consultation, document preparation, application submission, interview preparation (if required), visa collection.',
            timeline: '2-4 weeks depending on the destination country',
            price: 'Starting from $200 (varies by destination)',
            faqs: [
              {
                question: 'How long can I stay with a tourist visa?',
                answer: 'The duration varies by country, typically ranging from 30 to 90 days.'
              },
              {
                question: 'Can I extend my tourist visa?',
                answer: 'Some countries allow extensions, while others require you to exit and re-apply. We can advise on specific country regulations.'
              },
              {
                question: 'Do I need travel insurance for a tourist visa?',
                answer: 'Many countries require travel insurance as part of the visa application. We recommend obtaining comprehensive travel insurance regardless.'
              }
            ]
          });
          setLoading(false);
        } else {
          setError('Service not found');
          setLoading(false);
        }
      }
    };

    fetchService();
  }, [id]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'passport':
        return <FaPassport className="text-primary" size={60} />;
      case 'university':
        return <FaUniversity className="text-primary" size={60} />;
      case 'briefcase':
        return <FaBriefcase className="text-primary" size={60} />;
      case 'building':
        return <FaBuilding className="text-primary" size={60} />;
      case 'home':
        return <FaHome className="text-primary" size={60} />;
      default:
        return <FaPassport className="text-primary" size={60} />;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading service details...</p>
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Service not found'}
        </div>
        <Button variant="primary" onClick={() => navigate('/services')}>
          <FaArrowLeft className="me-2" /> Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <Container className="py-3">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/services' }}>Services</Breadcrumb.Item>
          <Breadcrumb.Item active>{service.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      {/* Service Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="fw-bold mb-3">{service.title}</h1>
              <p className="lead">{service.description}</p>
            </Col>
            <Col md={4} className="text-center">
              {getIcon(service.icon)}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Details */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8}>
              {/* Features */}
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h3 className="mb-4">Key Features</h3>
                  <ul className="feature-list">
                    {service.features && service.features.map((feature, index) => (
                      <li key={index} className="mb-3">
                        <FaCheck className="text-success me-2" /> {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>

              {/* Eligibility */}
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h3 className="mb-4">
                    <FaInfoCircle className="me-2 text-primary" />
                    {t('services.details.eligibility')}
                  </h3>
                  <p>{service.eligibility}</p>
                </Card.Body>
              </Card>

              {/* Process */}
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h3 className="mb-4">
                    <FaClock className="me-2 text-primary" />
                    {t('services.details.process')}
                  </h3>
                  <p>{service.process}</p>
                  <div className="bg-light p-3 rounded">
                    <p className="mb-0"><strong>Estimated Timeline:</strong> {service.timeline}</p>
                  </div>
                </Card.Body>
              </Card>

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <h3 className="mb-4">Frequently Asked Questions</h3>
                    <Accordion>
                      {service.faqs.map((faq, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header>{faq.question}</Accordion.Header>
                          <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col lg={4}>
              {/* Price Card */}
              <Card className="mb-4 shadow-sm sticky-top" style={{ top: '20px' }}>
                <Card.Body className="text-center">
                  <h3 className="mb-4">
                    <FaDollarSign className="me-2 text-primary" />
                    {t('services.details.price')}
                  </h3>
                  <p className="lead fw-bold mb-4">{service.price}</p>
                  <Button 
                    as={Link} 
                    to="/apply" 
                    variant="primary" 
                    size="lg" 
                    className="w-100 mb-3"
                  >
                    {t('services.details.apply')}
                  </Button>
                  <Button 
                    as={Link} 
                    to="/contact" 
                    variant="outline-primary" 
                    className="w-100"
                  >
                    {t('button.contact')}
                  </Button>
                </Card.Body>
              </Card>

              {/* Need Help Card */}
              <Card className="bg-light border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h4 className="mb-3">Need Help?</h4>
                  <p>Our visa experts are ready to answer your questions and guide you through the process.</p>
                  <div className="d-grid">
                    <Button 
                      as={Link} 
                      to="/contact" 
                      variant="outline-primary"
                    >
                      Contact Us
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Services */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">You May Also Be Interested In</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <FaUniversity className="text-primary mb-3" size={40} />
                  <Card.Title>Student Visas</Card.Title>
                  <Card.Text>Pursue your education abroad with our student visa assistance.</Card.Text>
                  <Link to="/services/2" className="btn btn-outline-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <FaBriefcase className="text-primary mb-3" size={40} />
                  <Card.Title>Work Permits</Card.Title>
                  <Card.Text>Advance your career internationally with our work permit services.</Card.Text>
                  <Link to="/services/3" className="btn btn-outline-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <FaBuilding className="text-primary mb-3" size={40} />
                  <Card.Title>Business Visas</Card.Title>
                  <Card.Text>Expand your business globally with our business visa solutions.</Card.Text>
                  <Link to="/services/4" className="btn btn-outline-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServiceDetailPage;