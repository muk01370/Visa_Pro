import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import ApplicationPage from './pages/ApplicationPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/routing/AdminRoute';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/apply" element={<ApplicationPage />} />
                <Route path="/faqs" element={<FAQPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;