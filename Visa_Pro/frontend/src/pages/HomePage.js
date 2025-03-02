import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPassport, FaUniversity, FaBriefcase, FaBuilding, FaHome } from 'react-icons/fa';

const HomePage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'John Smith',
      country: 'United States',
      text: 'Visa Pro made my visa application process incredibly smooth. Their expertise and guidance were invaluable.',
      rating: 5
    },
    {
      id: 2,
      name: 'Maria Garcia',
      country: 'Spain',
      text: 'I was struggling with my work permit application until I found Visa Pro. They simplified everything and helped me secure my permit quickly.',
      rating: 5
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      country: 'Egypt',
      text: 'The team at Visa Pro provided exceptional service for my student visa. Their attention to detail ensured my application was approved without any issues.',
      rating: 4
    }
  ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/services`);
        setServices(res.data.slice(0, 5)); // Get first 5 services
      } catch (err) {
        console.error('Error fetching services:', err);
        // Fallback data if API fails
        setServices([
          {
            _id: '1',
            title: 'Tourist Visas',
            description: 'Explore new destinations with our tourist visa services.',
            icon: 'passport'
          },
          {
            _id: '2',
            title: 'Student Visas',
            description: 'Pursue your education abroad with our student visa assistance.',
            icon: 'university'
          },
          {
            _id: '3',
            title: 'Work Permits',
            description: 'Advance your career internationally with our work permit services.',
            icon: 'briefcase'
          },
          {
            _id: '4',
            title: 'Business Visas',
            description: 'Expand your business globally with our business visa solutions.',
            icon: 'building'
          },
          {
            _id: '5',
            title: 'Permanent Residency',
            description: 'Start a new life abroad with our permanent residency services.',
            icon: 'home'
          }
        ]);
      }
    };

    fetchServices();
  }, []);

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

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">{t('home.hero.title')}</h1>
              <p className="lead mb-4">{t('home.hero.subtitle')}</p>
              <Button 
                as={Link} 
                to="/services" 
                variant="light" 
                size="lg" 
                className="me-3"
              >
                {t('home.hero.cta')}
              </Button>
              <Button 
                as={Link} 
                to="/contact" 
                variant="outline-light" 
                size="lg"
              >
                {t('button.contact')}
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="https://via.placeholder.com/600x400?text=Visa+Services" 
                alt="Visa Services" 
                className="img-fluid rounded shadow" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">{t('home.intro.title')}</h2>
              <p className="lead">{t('home.intro.text')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">{t('home.services.title')}</h2>
              <p className="lead">{t('home.services.subtitle')}</p>
            </Col>
          </Row>
          <Row>
            {services.map((service) => (
              <Col key={service._id} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0 text-center p-4">
                  <Card.Body>
                    {getIcon(service.icon)}
                    <Card.Title className="mb-3 fw-bold">{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Link to={`/services/${service._id}`} className="btn btn-outline-primary mt-3">
                      {t('button.readmore')}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-4 text-center">
            <Col>
              <Button as={Link} to="/services" variant="primary">
                {t('home.hero.cta')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">{t('home.testimonials.title')}</h2>
              <p className="lead">{t('home.testimonials.subtitle')}</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel 
                indicators={true} 
                controls={true} 
                interval={5000} 
                className="testimonial-carousel bg-light p-5 rounded shadow-sm"
              >
                {testimonials.map((testimonial) => (
                  <Carousel.Item key={testimonial.id}>
                    <div className="text-center">
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-${i < testimonial.rating ? 'warning' : 'secondary'} fs-4 mx-1`}>★</span>
                        ))}
                      </div>
                      <p className="lead mb-4">"{testimonial.text}"</p>
                      <p className="fw-bold mb-1">{testimonial.name}</p>
                      <p className="text-muted">{testimonial.country}</p>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">{t('home.cta.title')}</h2>
              <p className="lead mb-4">{t('home.cta.text')}</p>
              <Button 
                as={Link} 
                to="/contact" 
                variant="light" 
                size="lg" 
                className="me-3"
              >
                {t('home.cta.button')}
              </Button>
              <Button 
                as={Link} 
                to="/apply" 
                variant="outline-light" 
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

export default HomePage;