import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const FAQPage = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: t('faq.categories.all') },
    { id: 'general', name: t('faq.categories.general') },
    { id: 'application', name: t('faq.categories.application') },
    { id: 'documents', name: t('faq.categories.documents') },
    { id: 'fees', name: t('faq.categories.fees') },
    { id: 'timeline', name: t('faq.categories.timeline') }
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/faqs`);
        setFaqs(res.data);
        setFilteredFaqs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        const fallbackData = [
          {
            _id: '1',
            question: 'What is a visa?',
            answer: 'A visa is an official document that allows the bearer to legally enter a foreign country. The visa is usually stamped or glued into the bearer\'s passport.',
            category: 'general'
          },
          {
            _id: '2',
            question: 'How long does the visa application process take?',
            answer: 'The processing time varies depending on the type of visa and the country you are applying to. Tourist visas typically take 2-4 weeks, while work permits and permanent residency applications can take several months.',
            category: 'timeline'
          },
          {
            _id: '3',
            question: 'What documents do I need for a visa application?',
            answer: 'Common documents include a valid passport, visa application form, passport-sized photos, proof of travel insurance, proof of accommodation, proof of sufficient funds, and a return ticket. Specific requirements vary by visa type and country.',
            category: 'documents'
          },
          {
            _id: '4',
            question: 'How much does a visa cost?',
            answer: 'Visa fees vary widely depending on the type of visa and the country. Tourist visas typically range from $40 to $160, while work permits and permanent residency applications can cost several hundred dollars.',
            category: 'fees'
          },
          {
            _id: '5',
            question: 'Can I expedite my visa application?',
            answer: 'Many countries offer expedited processing for an additional fee. We can help you determine if this option is available for your specific visa application.',
            category: 'application'
          },
          {
            _id: '6',
            question: 'What happens if my visa application is denied?',
            answer: 'If your visa application is denied, you will typically receive a reason for the denial. Depending on the reason, you may be able to appeal the decision or reapply with additional documentation. Our consultants can help you navigate this process.',
            category: 'application'
          },
          {
            _id: '7',
            question: 'Do I need a visa for every country I visit?',
            answer: 'Visa requirements depend on your nationality and the country you wish to visit. Some countries have visa-free agreements, while others require visas for all foreign visitors. We can help you determine the specific requirements for your travel plans.',
            category: 'general'
          },
          {
            _id: '8',
            question: 'Can I apply for a visa if I have a criminal record?',
            answer: 'Having a criminal record may affect your visa application, but it doesn\'t automatically disqualify you. The impact depends on the nature of the offense, when it occurred, and the immigration policies of the country you\'re applying to.',
            category: 'application'
          },
          {
            _id: '9',
            question: 'What is the difference between a single-entry and multiple-entry visa?',
            answer: 'A single-entry visa allows you to enter the country once and expires after you leave. A multiple-entry visa allows you to enter and exit the country multiple times within the visa\'s validity period.',
            category: 'general'
          },
          {
            _id: '10',
            question: 'How can I check my visa application status?',
            answer: 'Most countries provide an online portal where you can check your visa application status using your application reference number. We also provide regular updates to our clients on their application status.',
            category: 'application'
          }
        ];
        
        setFaqs(fallbackData);
        setFilteredFaqs(fallbackData);
      }
    };

    fetchFaqs();
  }, []);

  useEffect(() => {
    // Filter FAQs based on category and search term
    let filtered = faqs;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faq => 
          faq.question.toLowerCase().includes(term) || 
          faq.answer.toLowerCase().includes(term)
      );
    }
    
    setFilteredFaqs(filtered);
  }, [activeCategory, searchTerm, faqs]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading FAQs...</p>
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
              <h1 className="fw-bold mb-3">{t('faq.title')}</h1>
              <p className="lead">{t('faq.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search and Filter */}
      <section className="mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} className="mb-4">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={t('faq.search')}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="mb-4">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
                    className="me-2 mb-2"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ List */}
      <section className="py-5">
        <Container>
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-5">
              <h3>No FAQs found matching your criteria.</h3>
              <Button 
                variant="primary" 
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                }} 
                className="mt-3"
              >
                {t('faq.categories.all')}
              </Button>
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col lg={8}>
                <Accordion>
                  {filteredFaqs.map((faq, index) => (
                    <Accordion.Item key={faq._id} eventKey={index.toString()}>
                      <Accordion.Header>
                        <span className="fw-bold">{faq.question}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>{faq.answer}</p>
                        <div className="text-end">
                          <span className="badge bg-light text-dark">
                            {categories.find(cat => cat.id === faq.category)?.name || faq.category}
                          </span>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Still Have Questions */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <h2 className="mb-3">Still Have Questions?</h2>
                  <p className="lead mb-4">
                    Can't find the answer you're looking for? Please contact our support team.
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    href="/contact"
                  >
                    {t('button.contact')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FAQPage;