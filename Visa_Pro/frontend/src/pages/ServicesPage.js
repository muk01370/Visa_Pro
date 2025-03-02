import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPassport, FaUniversity, FaBriefcase, FaBuilding, FaHome } from 'react-icons/fa';

const ServicesPage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/services`);
        setServices(res.data);
        setFilteredServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        const fallbackData = [
          {
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
            ]
          },
          {
            _id: '2',
            title: 'Student Visas',
            description: 'Pursue your education abroad with our student visa assistance. We support students in obtaining visas for educational institutions around the world.',
            category: 'student',
            icon: 'university',
            features: [
              'University application guidance',
              'Financial documentation assistance',
              'Visa interview preparation',
              'Pre-departure orientation'
            ]
          },
          {
            _id: '3',
            title: 'Work Permits',
            description: 'Advance your career internationally with our work permit services. We help professionals secure legal authorization to work in foreign countries.',
            category: 'work',
            icon: 'briefcase',
            features: [
              'Employer sponsorship guidance',
              'Labor market impact assessment',
              'Work permit extensions',
              'Family member visas'
            ]
          },
          {
            _id: '4',
            title: 'Business Visas',
            description: 'Expand your business globally with our business visa solutions. We assist entrepreneurs and companies in establishing international presence.',
            category: 'business',
            icon: 'building',
            features: [
              'Business plan preparation',
              'Investment documentation',
              'Market entry strategy',
              'Business registration assistance'
            ]
          },
          {
            _id: '5',
            title: 'Permanent Residency',
            description: 'Start a new life abroad with our permanent residency services. We guide you through the complex process of obtaining permanent resident status.',
            category: 'permanent',
            icon: 'home',
            features: [
              'Eligibility assessment',
              'Points-based system guidance',
              'Document verification',
              'Settlement assistance'
            ]
          }
        ];
        
        setServices(fallbackData);
        setFilteredServices(fallbackData);
      }
    };

    fetchServices();
  }, []);

  const filterServices = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === category));
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'passport':
        return <FaPassport className="mb-4 text-primary" size={40} />;
      case 'university':
        return <FaUniversity className="mb-4 text-primary" size={40} />;
      case 'briefcase':
        return <FaBriefcase className="mb-4 text-primary" size={40} />;
      case 'building':
        return <FaBuilding className="mb-4 text-primary" size={40} />;
      case 'home':
        return <FaHome className="mb-4 text-primary" size={40} />;
      default:
        return <FaPassport className="mb-4 text-primary" size={40} />;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading services...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-3">{t('services.title')}</h1>
              <p className="lead">{t('services.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Buttons */}
      <section className="mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <ButtonGroup className="flex-wrap">
                <Button 
                  variant={activeFilter === 'all' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('all')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.all')}
                </Button>
                <Button 
                  variant={activeFilter === 'tourist' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('tourist')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.tourist')}
                </Button>
                <Button 
                  variant={activeFilter === 'student' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('student')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.student')}
                </Button>
                <Button 
                  variant={activeFilter === 'work' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('work')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.work')}
                </Button>
                <Button 
                  variant={activeFilter === 'business' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('business')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.business')}
                </Button>
                <Button 
                  variant={activeFilter === 'permanent' ? 'primary' : 'outline-primary'} 
                  onClick={() => filterServices('permanent')}
                  className="mb-2 mb-md-0"
                >
                  {t('services.filter.permanent')}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-5">
        <Container>
          {filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <h3>No services found in this category.</h3>
              <Button 
                variant="primary" 
                onClick={() => filterServices('all')} 
                className="mt-3"
              >
                {t('services.filter.all')}
              </Button>
            </div>
          ) : (
            <Row>
              {filteredServices.map((service) => (
                <Col key={service._id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="p-4">
                      <div className="text-center mb-4">
                        {getIcon(service.icon)}
                        <Card.Title className="fw-bold">{service.title}</Card.Title>
                      </div>
                      <Card.Text>{service.description}</Card.Text>
                      <ul className="mb-4">
                        {service.features && service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className="text-center mt-auto">
                        <Link 
                          to={`/services/${service._id}`} 
                          className="btn btn-primary"
                        >
                          {t('button.readmore')}
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Ready to Start Your Visa Journey?</h2>
              <p className="lead mb-4">Contact us today for a consultation or apply directly online.</p>
              <Button 
                as={Link} 
                to="/contact" 
                variant="primary" 
                size="lg" 
                className="me-3"
              >
                {t('button.contact')}
              </Button>
              <Button 
                as={Link} 
                to="/apply" 
                variant="outline-primary" 
                size="lg"
              >
                {t('button.apply')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;