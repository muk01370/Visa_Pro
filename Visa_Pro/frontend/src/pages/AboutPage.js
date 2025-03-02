import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHandshake, FaStar, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      bio: 'With over 15 years of experience in immigration law, Sarah founded Visa Pro to help individuals navigate the complex visa application process.',
      image: 'https://via.placeholder.com/300x300?text=Sarah+Johnson'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Immigration Consultant',
      bio: 'Michael specializes in work permits and business visas, with a strong background in international business relations.',
      image: 'https://via.placeholder.com/300x300?text=Michael+Chen'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      position: 'Student Visa Specialist',
      bio: 'Elena has helped hundreds of students achieve their dreams of studying abroad through her expertise in student visa applications.',
      image: 'https://via.placeholder.com/300x300?text=Elena+Rodriguez'
    },
    {
      id: 4,
      name: 'David Okafor',
      position: 'Permanent Residency Expert',
      bio: 'David\'s knowledge of permanent residency pathways has made him a trusted advisor for those looking to settle abroad permanently.',
      image: 'https://via.placeholder.com/300x300?text=David+Okafor'
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-3">{t('about.title')}</h1>
              <p className="lead">{t('about.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center mb-5">
              <h2 className="fw-bold mb-4">{t('about.mission.title')}</h2>
              <p className="lead">{t('about.mission.text')}</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center p-4 h-100 bg-light rounded shadow-sm">
                <FaHandshake className="text-primary mb-3" size={50} />
                <h3 className="h4 fw-bold">{t('about.values.integrity')}</h3>
                <p>{t('about.values.integrity.text')}</p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center p-4 h-100 bg-light rounded shadow-sm">
                <FaStar className="text-primary mb-3" size={50} />
                <h3 className="h4 fw-bold">{t('about.values.excellence')}</h3>
                <p>{t('about.values.excellence.text')}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 h-100 bg-light rounded shadow-sm">
                <FaUsers className="text-primary mb-3" size={50} />
                <h3 className="h4 fw-bold">{t('about.values.client')}</h3>
                <p>{t('about.values.client.text')}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">{t('about.team.title')}</h2>
              <p className="lead">{t('about.team.subtitle')}</p>
            </Col>
          </Row>
          <Row>
            {teamMembers.map((member) => (
              <Col key={member.id} lg={3} md={6} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img variant="top" src={member.image} alt={member.name} />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">{member.position}</Card.Subtitle>
                    <Card.Text>{member.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={3} className="text-center mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-primary">15+</h2>
              <p className="lead">Years of Experience</p>
            </Col>
            <Col md={3} className="text-center mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-primary">5,000+</h2>
              <p className="lead">Successful Applications</p>
            </Col>
            <Col md={3} className="text-center mb-4 mb-md-0">
              <h2 className="display-4 fw-bold text-primary">50+</h2>
              <p className="lead">Countries Served</p>
            </Col>
            <Col md={3} className="text-center">
              <h2 className="display-4 fw-bold text-primary">98%</h2>
              <p className="lead">Success Rate</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutPage;