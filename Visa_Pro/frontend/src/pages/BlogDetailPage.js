import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const BlogDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/${id}`);
        setBlog(res.data);
        
        // Fetch related blogs
        const relatedRes = await axios.get(`${process.env.REACT_APP_API_URL}/blogs?tags=${res.data.tags.join(',')}&limit=3&exclude=${id}`);
        setRelatedBlogs(relatedRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
        
        // Fallback data if API fails
        if (id === '1') {
          const fallbackBlog = {
            _id: '1',
            title: 'Top 10 Tips for a Successful Visa Application',
            content: `
              <p>Applying for a visa can be a complex process, but with the right preparation, you can increase your chances of success. Here are our top 10 tips for a successful visa application:</p>
              
              <h3>1. Start Early</h3>
              <p>Begin your visa application process well in advance of your planned travel date. This gives you ample time to gather all necessary documents and address any unexpected issues that may arise.</p>
              
              <h3>2. Research Visa Requirements Thoroughly</h3>
              <p>Each country has specific visa requirements. Make sure you understand exactly what documents and information you need to provide for your particular visa type and destination.</p>
              
              <h3>3. Prepare Complete and Accurate Documentation</h3>
              <p>Ensure all your documents are complete, accurate, and up-to-date. Missing or incorrect information can lead to delays or rejection of your application.</p>
              
              <h3>4. Be Honest</h3>
              <p>Always provide truthful information in your visa application. Dishonesty can result in immediate rejection and may affect future visa applications.</p>
              
              <h3>5. Demonstrate Strong Ties to Your Home Country</h3>
              <p>For temporary visas, immigration officers want to see that you have strong reasons to return to your home country after your visit. This could include employment, property ownership, family ties, or educational commitments.</p>
              
              <h3>6. Provide Clear Financial Documentation</h3>
              <p>Most visa applications require proof that you can financially support yourself during your stay. Provide clear, organized financial documents that demonstrate sufficient funds.</p>
              
              <h3>7. Follow Formatting Guidelines</h3>
              <p>Pay attention to specific formatting requirements for photos, forms, and supporting documents. Even minor deviations can cause delays in processing.</p>
              
              <h3>8. Prepare for Your Interview</h3>
              <p>If your visa application requires an interview, prepare thoroughly. Practice answering common questions about your travel plans, purpose of visit, and ties to your home country.</p>
              
              <h3>9. Be Consistent</h3>
              <p>Ensure that the information in your application, supporting documents, and interview responses is consistent. Discrepancies can raise red flags for visa officers.</p>
              
              <h3>10. Seek Professional Assistance</h3>
              <p>If you're unsure about any aspect of the visa application process, consider seeking help from a reputable immigration consultant or visa service provider like Visa Pro.</p>
              
              <p>By following these tips, you can navigate the visa application process more smoothly and increase your chances of approval. Remember that each visa application is unique, and what works for one person may not work for another. It's always best to tailor your approach to your specific circumstances and the requirements of your destination country.</p>
            `,
            summary: 'Learn the essential tips to ensure your visa application process goes smoothly and successfully.',
            author: 'Sarah Johnson',
            date: '2023-05-15',
            tags: ['application', 'tips', 'documents'],
            image: 'https://via.placeholder.com/1200x600?text=Visa+Application+Tips'
          };
          
          setBlog(fallbackBlog);
          
          // Fallback related blogs
          const fallbackRelated = [
            {
              _id: '6',
              title: 'Common Visa Interview Questions and How to Answer Them',
              summary: 'Prepare for your visa interview with our guide to common questions and effective answers.',
              author: 'Michael Chen',
              date: '2023-02-18',
              tags: ['interview', 'tips', 'application'],
              image: 'https://via.placeholder.com/800x400?text=Visa+Interview+Questions'
            },
            {
              _id: '3',
              title: 'Work Permits: A Comparison of Different Countries',
              summary: 'Compare work permit processes across different countries to find the best option for your career goals.',
              author: 'Elena Rodriguez',
              date: '2023-04-10',
              tags: ['work', 'comparison', 'international'],
              image: 'https://via.placeholder.com/800x400?text=Work+Permits+Comparison'
            },
            {
              _id: '5',
              title: 'Permanent Residency Pathways: Which One Is Right for You?',
              summary: 'Explore different permanent residency options to find the best path for your personal situation.',
              author: 'Sarah Johnson',
              date: '2023-03-05',
              tags: ['permanent', 'residency', 'immigration'],
              image: 'https://via.placeholder.com/800x400?text=Permanent+Residency+Pathways'
            }
          ];
          
          setRelatedBlogs(fallbackRelated);
          setLoading(false);
        } else {
          setError('Blog post not found');
          setLoading(false);
        }
      }
    };

    fetchBlog();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const shareUrl = window.location.href;
  const shareTitle = blog ? blog.title : 'Visa Pro Blog Post';

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading blog post...</p>
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Blog post not found'}
        </div>
        <Button variant="primary" onClick={() => navigate('/blogs')}>
          <FaArrowLeft className="me-2" /> Back to Blogs
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
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/blogs' }}>Blog</Breadcrumb.Item>
          <Breadcrumb.Item active>{blog.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      {/* Blog Header */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="fw-bold mb-3">{blog.title}</h1>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <span className="me-3"><FaUser className="me-1" /> {blog.author}</span>
                <span><FaCalendarAlt className="me-1" /> {formatDate(blog.date)}</span>
              </div>
              <div>
                {blog.tags && blog.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    bg="light" 
                    text="dark" 
                    className="me-2 text-capitalize"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blog Content */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              {/* Featured Image */}
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="img-fluid rounded mb-5 w-100" 
              />
              
              {/* Blog Content */}
              <div 
                className="blog-content mb-5"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              
              {/* Tags and Share */}
              <div className="d-flex flex-wrap justify-content-between align-items-center py-4 border-top border-bottom mb-5">
                <div className="mb-3 mb-md-0">
                  <strong className="me-2">{t('blog.tags')}:</strong>
                  {blog.tags && blog.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to={`/blogs?tag=${tag}`} 
                      className="badge bg-light text-dark text-decoration-none me-2 text-capitalize"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div>
                  <strong className="me-2">{t('blog.share')}:</strong>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-sm btn-outline-primary me-2"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-sm btn-outline-primary me-2"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-sm btn-outline-primary me-2"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a 
                    href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} 
                    className="btn btn-sm btn-outline-primary"
                    aria-label="Share via Email"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
              
              {/* Author Bio */}
              <Card className="border-0 bg-light mb-5">
                <Card.Body className="p-4">
                  <Row>
                    <Col md={3} className="text-center mb-3 mb-md-0">
                      <img 
                        src={`https://via.placeholder.com/150x150?text=${blog.author.split(' ').map(n => n[0]).join('')}`} 
                        alt={blog.author} 
                        className="rounded-circle img-fluid" 
                        style={{ maxWidth: '100px' }}
                      />
                    </Col>
                    <Col md={9}>
                      <h4>{blog.author}</h4>
                      <p className="mb-0">
                        Immigration consultant with extensive experience in visa applications and immigration law. 
                        Dedicated to helping clients navigate the complex visa process with ease and confidence.
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              
              {/* Back to Blogs Button */}
              <div className="text-center mb-5">
                <Button 
                  variant="outline-primary" 
                  as={Link} 
                  to="/blogs"
                  className="px-4"
                >
                  <FaArrowLeft className="me-2" /> Back to All Blogs
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <h2 className="text-center mb-5">{t('blog.related')}</h2>
            <Row>
              {relatedBlogs.map(relatedBlog => (
                <Col key={relatedBlog._id} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img variant="top" src={relatedBlog.image} alt={relatedBlog.title} />
                    <Card.Body>
                      <Card.Title className="fw-bold">{relatedBlog.title}</Card.Title>
                      <Card.Text>{relatedBlog.summary}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center text-muted mb-3">
                        <small><FaUser className="me-1" /> {relatedBlog.author}</small>
                        <small><FaCalendarAlt className="me-1" /> {formatDate(relatedBlog.date)}</small>
                      </div>
                      <Link to={`/blogs/${relatedBlog._id}`} className="btn btn-outline-primary">
                        {t('blog.readmore')}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default BlogDetailPage;