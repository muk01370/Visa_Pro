import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Button, Table, Badge } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { 
  FaHome, FaClipboardList, FaNewspaper, FaEnvelope, 
  FaFileAlt, FaQuestion, FaEdit, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

// Dashboard Overview Component
const DashboardOverview = () => {
  const { t } = useTranslation();
  
  // Mock data for dashboard stats
  const stats = [
    { title: 'Total Applications', count: 156, icon: <FaFileAlt />, color: 'primary' },
    { title: 'Pending Applications', count: 43, icon: <FaClipboardList />, color: 'warning' },
    { title: 'New Inquiries', count: 12, icon: <FaEnvelope />, color: 'info' },
    { title: 'Blog Posts', count: 24, icon: <FaNewspaper />, color: 'success' }
  ];
  
  // Mock data for recent applications
  const recentApplications = [
    { id: 'APP-2023-001', name: 'John Smith', service: 'Tourist Visa', date: '2023-05-15', status: 'Pending' },
    { id: 'APP-2023-002', name: 'Maria Garcia', service: 'Student Visa', date: '2023-05-14', status: 'Approved' },
    { id: 'APP-2023-003', name: 'Ahmed Hassan', service: 'Work Permit', date: '2023-05-13', status: 'In Review' },
    { id: 'APP-2023-004', name: 'Li Wei', service: 'Business Visa', date: '2023-05-12', status: 'Pending' },
    { id: 'APP-2023-005', name: 'Emma Johnson', service: 'Permanent Residency', date: '2023-05-11', status: 'Approved' }
  ];
  
  return (
    <>
      <h2 className="mb-4">{t('admin.dashboard')}</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={3} className="mb-3 mb-md-0">
            <Card className={`border-0 shadow-sm h-100 bg-${stat.color} bg-opacity-10`}>
              <Card.Body className="d-flex align-items-center">
                <div className={`text-${stat.color} me-3 fs-3`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="fs-4 fw-bold mb-0">{stat.count}</h3>
                  <p className="text-muted mb-0">{stat.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Recent Applications */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Applications</h5>
            <Button variant="outline-primary" size="sm">View All</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>{app.service}</td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={
                      app.status === 'Approved' ? 'success' : 
                      app.status === 'Pending' ? 'warning' : 
                      app.status === 'In Review' ? 'info' : 'secondary'
                    }>
                      {app.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="link" size="sm" className="p-0">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0">Quick Actions</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3} className="mb-3 mb-md-0">
              <Button variant="outline-primary" className="w-100 py-3">
                <FaFileAlt className="mb-2 d-block mx-auto" size={24} />
                New Application
              </Button>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Button variant="outline-primary" className="w-100 py-3">
                <FaNewspaper className="mb-2 d-block mx-auto" size={24} />
                Add Blog Post
              </Button>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Button variant="outline-primary" className="w-100 py-3">
                <FaQuestion className="mb-2 d-block mx-auto" size={24} />
                Add FAQ
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" className="w-100 py-3">
                <FaEdit className="mb-2 d-block mx-auto" size={24} />
                Edit Services
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

// Applications Component
const Applications = () => {
  return (
    <>
      <h2 className="mb-4">Applications</h2>
      <p>Manage visa applications here.</p>
      {/* Applications content would go here */}
    </>
  );
};

// Blogs Component
const Blogs = () => {
  return (
    <>
      <h2 className="mb-4">Blog Posts</h2>
      <p>Manage blog posts here.</p>
      {/* Blogs content would go here */}
    </>
  );
};

// Inquiries Component
const Inquiries = () => {
  return (
    <>
      <h2 className="mb-4">Inquiries</h2>
      <p>Manage customer inquiries here.</p>
      {/* Inquiries content would go here */}
    </>
  );
};

// Services Component
const Services = () => {
  return (
    <>
      <h2 className="mb-4">Services</h2>
      <p>Manage visa services here.</p>
      {/* Services content would go here */}
    </>
  );
};

// FAQs Component
const FAQs = () => {
  return (
    <>
      <h2 className="mb-4">FAQs</h2>
      <p>Manage frequently asked questions here.</p>
      {/* FAQs content would go here */}
    </>
  );
};

// Settings Component
const Settings = () => {
  return (
    <>
      <h2 className="mb-4">Settings</h2>
      <p>Manage admin settings here.</p>
      {/* Settings content would go here */}
    </>
  );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  // Get the current active path
  const getActivePath = () => {
    const path = location.pathname;
    if (path === '/admin') return 'dashboard';
    const subPath = path.split('/admin/')[1];
    return subPath || 'dashboard';
  };
  
  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="mb-4 mb-md-0">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="p-3 bg-primary text-white">
                <h5 className="mb-0">{t('app.name')} Admin</h5>
              </div>
              <Nav className="flex-column">
                <Nav.Link 
                  as={Link} 
                  to="/admin" 
                  className={getActivePath() === 'dashboard' ? 'active' : ''}
                >
                  <FaHome className="me-2" /> {t('admin.dashboard')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/applications" 
                  className={getActivePath() === 'applications' ? 'active' : ''}
                >
                  <FaFileAlt className="me-2" /> {t('admin.applications')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/services" 
                  className={getActivePath() === 'services' ? 'active' : ''}
                >
                  <FaClipboardList className="me-2" /> {t('admin.services')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/blogs" 
                  className={getActivePath() === 'blogs' ? 'active' : ''}
                >
                  <FaNewspaper className="me-2" /> {t('admin.blogs')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/inquiries" 
                  className={getActivePath() === 'inquiries' ? 'active' : ''}
                >
                  <FaEnvelope className="me-2" /> {t('admin.inquiries')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/faqs" 
                  className={getActivePath() === 'faqs' ? 'active' : ''}
                >
                  <FaQuestion className="me-2" /> {t('admin.faqs')}
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/settings" 
                  className={getActivePath() === 'settings' ? 'active' : ''}
                >
                  <FaCog className="me-2" /> {t('admin.settings')}
                </Nav.Link>
                <Nav.Link 
                  onClick={handleLogout}
                  className="text-danger"
                >
                  <FaSignOutAlt className="me-2" /> {t('admin.logout')}
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Main Content */}
        <Col md={9} lg={10}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/inquiries" element={<Inquiries />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;