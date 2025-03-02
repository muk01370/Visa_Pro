import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import axios from 'axios';

const BlogsPage = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState(['all']);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
        setBlogs(res.data);
        setFilteredBlogs(res.data);
        
        // Extract unique tags
        const allTags = ['all'];
        res.data.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => {
              if (!allTags.includes(tag)) {
                allTags.push(tag);
              }
            });
          }
        });
        setTags(allTags);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        const fallbackData = [
          {
            _id: '1',
            title: 'Top 10 Tips for a Successful Visa Application',
            content: 'Applying for a visa can be a complex process, but with the right preparation, you can increase your chances of success...',
            summary: 'Learn the essential tips to ensure your visa application process goes smoothly and successfully.',
            author: 'Sarah Johnson',
            date: '2023-05-15',
            tags: ['application', 'tips', 'documents'],
            image: 'https://via.placeholder.com/800x400?text=Visa+Application+Tips'
          },
          {
            _id: '2',
            title: 'Understanding Student Visa Requirements for Popular Destinations',
            content: 'If you're planning to study abroad, understanding the specific visa requirements for your chosen destination is crucial...',
            summary: 'A comprehensive guide to student visa requirements for the most popular study abroad destinations.',
            author: 'Michael Chen',
            date: '2023-04-28',
            tags: ['student', 'education', 'requirements'],
            image: 'https://via.placeholder.com/800x400?text=Student+Visa+Guide'
          },
          {
            _id: '3',
            title: 'Work Permits: A Comparison of Different Countries',
            content: 'Work permit regulations vary significantly from country to country. This article compares the requirements, processes, and benefits...',
            summary: 'Compare work permit processes across different countries to find the best option for your career goals.',
            author: 'Elena Rodriguez',
            date: '2023-04-10',
            tags: ['work', 'comparison', 'international'],
            image: 'https://via.placeholder.com/800x400?text=Work+Permits+Comparison'
          },
          {
            _id: '4',
            title: 'The Impact of COVID-19 on Immigration Policies Worldwide',
            content: 'The COVID-19 pandemic has significantly altered immigration policies around the world. This article examines the changes...',
            summary: 'An analysis of how the pandemic has changed immigration policies and what it means for visa applicants.',
            author: 'David Okafor',
            date: '2023-03-22',
            tags: ['covid-19', 'policy', 'international'],
            image: 'https://via.placeholder.com/800x400?text=COVID+Immigration+Impact'
          },
          {
            _id: '5',
            title: 'Permanent Residency Pathways: Which One Is Right for You?',
            content: 'There are multiple pathways to permanent residency, each with its own requirements and benefits. This guide helps you determine...',
            summary: 'Explore different permanent residency options to find the best path for your personal situation.',
            author: 'Sarah Johnson',
            date: '2023-03-05',
            tags: ['permanent', 'residency', 'immigration'],
            image: 'https://via.placeholder.com/800x400?text=Permanent+Residency+Pathways'
          },
          {
            _id: '6',
            title: 'Common Visa Interview Questions and How to Answer Them',
            content: 'The visa interview can be a nerve-wracking experience. This article covers the most common questions asked during visa interviews...',
            summary: 'Prepare for your visa interview with our guide to common questions and effective answers.',
            author: 'Michael Chen',
            date: '2023-02-18',
            tags: ['interview', 'tips', 'application'],
            image: 'https://via.placeholder.com/800x400?text=Visa+Interview+Questions'
          }
        ];
        
        setBlogs(fallbackData);
        setFilteredBlogs(fallbackData);
        
        // Extract unique tags from fallback data
        const fallbackTags = ['all'];
        fallbackData.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => {
              if (!fallbackTags.includes(tag)) {
                fallbackTags.push(tag);
              }
            });
          }
        });
        setTags(fallbackTags);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on tag and search term
    let filtered = blogs;
    
    // Filter by tag
    if (activeTag !== 'all') {
      filtered = filtered.filter(blog => 
        blog.tags && Array.isArray(blog.tags) && blog.tags.includes(activeTag)
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        blog => 
          blog.title.toLowerCase().includes(term) || 
          blog.summary.toLowerCase().includes(term) ||
          blog.content.toLowerCase().includes(term)
      );
    }
    
    setFilteredBlogs(filtered);
  }, [activeTag, searchTerm, blogs]);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading blog posts...</p>
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
              <h1 className="fw-bold mb-3">{t('blog.title')}</h1>
              <p className="lead">{t('blog.subtitle')}</p>
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
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="mb-4">
                {tags.map(tag => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? 'primary' : 'outline-primary'}
                    className="me-2 mb-2 text-capitalize"
                    onClick={() => handleTagChange(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-5">
        <Container>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-5">
              <h3>No blog posts found matching your criteria.</h3>
              <Button 
                variant="primary" 
                onClick={() => {
                  setActiveTag('all');
                  setSearchTerm('');
                }} 
                className="mt-3"
              >
                View All Posts
              </Button>
            </div>
          ) : (
            <Row>
              {filteredBlogs.map(blog => (
                <Col key={blog._id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img variant="top" src={blog.image} alt={blog.title} />
                    <Card.Body>
                      <div className="mb-2">
                        {blog.tags && blog.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            bg="light" 
                            text="dark" 
                            className="me-2 text-capitalize"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleTagChange(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Card.Title className="fw-bold">{blog.title}</Card.Title>
                      <Card.Text>{blog.summary}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center text-muted mb-3">
                        <small><FaUser className="me-1" /> {blog.author}</small>
                        <small><FaCalendarAlt className="me-1" /> {formatDate(blog.date)}</small>
                      </div>
                      <Link to={`/blogs/${blog._id}`} className="btn btn-outline-primary">
                        {t('blog.readmore')}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="mb-3">Subscribe to Our Newsletter</h2>
              <p className="lead mb-4">
                Stay updated with the latest visa and immigration news, tips, and insights.
              </p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your Email Address"
                  className="me-2"
                  required
                />
                <Button type="submit" variant="primary">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogsPage;