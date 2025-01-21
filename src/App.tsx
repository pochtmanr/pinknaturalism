import React, { useState } from 'react';
import { Mail, Instagram, Send, Phone, MapPin, Lock, Menu, X } from 'lucide-react';
import Overview from './components/Overview';
import Editorial from './components/Editorial';
import Commercial from './components/Commercial';
import Video from './components/Video';
import AdminPanel from './components/admin/AdminPanel';

const images = [
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80",
  // Duplicating images to create continuous scroll effect
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80"
];

function App() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'overview':
        return <Overview images={images} />;
      case 'editorial':
        return <Editorial />;
      case 'commercial':
        return <Commercial />;
      case 'video':
        return <Video />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Overview images={images} />;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="py-8 px-4">
        <nav className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center space-y-8">
            <h1 className="logo text-3xl md:text-5xl">pinknaturalism</h1>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              <button 
                onClick={() => setCurrentSection('overview')} 
                className={`nav-link ${currentSection === 'overview' ? 'text-pink-500' : ''}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setCurrentSection('editorial')} 
                className={`nav-link ${currentSection === 'editorial' ? 'text-pink-500' : ''}`}
              >
                Editorial
              </button>
              <button 
                onClick={() => setCurrentSection('commercial')} 
                className={`nav-link ${currentSection === 'commercial' ? 'text-pink-500' : ''}`}
              >
                Commercial
              </button>
              <button 
                onClick={() => setCurrentSection('video')} 
                className={`nav-link ${currentSection === 'video' ? 'text-pink-500' : ''}`}
              >
                Video
              </button>
              <button 
                onClick={() => setCurrentSection('admin')} 
                className={`nav-link ${currentSection === 'admin' ? 'text-pink-500' : ''}`}
                title="Admin Panel"
              >
                <Lock size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-cream z-50 py-4 px-6 space-y-4 shadow-lg">
                <button 
                  onClick={() => {
                    setCurrentSection('overview');
                    setMobileMenuOpen(false);
                  }} 
                  className={`nav-link block w-full text-left ${currentSection === 'overview' ? 'text-pink-500' : ''}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('editorial');
                    setMobileMenuOpen(false);
                  }} 
                  className={`nav-link block w-full text-left ${currentSection === 'editorial' ? 'text-pink-500' : ''}`}
                >
                  Editorial
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('commercial');
                    setMobileMenuOpen(false);
                  }} 
                  className={`nav-link block w-full text-left ${currentSection === 'commercial' ? 'text-pink-500' : ''}`}
                >
                  Commercial
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('video');
                    setMobileMenuOpen(false);
                  }} 
                  className={`nav-link block w-full text-left ${currentSection === 'video' ? 'text-pink-500' : ''}`}
                >
                  Video
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('admin');
                    setMobileMenuOpen(false);
                  }} 
                  className={`nav-link block w-full text-left ${currentSection === 'admin' ? 'text-pink-500' : ''}`}
                  title="Admin Panel"
                >
                  <Lock size={20} />
                </button>
              </div>
            )}

            <div className="flex space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-pink-500">
                <Instagram size={24} />
              </a>
              <a href="mailto:contact@pinknaturalism.com" className="text-gray-800 hover:text-pink-500">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="w-full overflow-hidden">
        {renderSection()}
        
        {currentSection !== 'admin' && (
          <section id="contact" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="moving-text-container mb-16">
                <div className="moving-text text-4xl font-playfair italic text-pink-500">
                  Let's create something beautiful together • Get in touch • Collaborate with us • 
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h2 className="text-3xl font-playfair italic text-pink-500">Contact Us</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Phone className="text-pink-500" size={20} />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="text-pink-500" size={20} />
                      <span>hello@pinknaturalism.com</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="text-pink-500" size={20} />
                      <span>New York, NY</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form space-y-8">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="contact-button">
                    Send Message <Send size={16} className="inline ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {currentSection !== 'admin' && (
        <footer className="footer-wave bg-pink-50 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="moving-text-container">
              <div className="moving-text text-2xl font-playfair text-pink-500">
                Fashion • Editorial • Commercial • Video Production • Creative Direction • 
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-xl font-playfair italic text-pink-500 mb-4">About</h3>
                <p className="text-gray-600">Creating timeless imagery that captures the essence of beauty and style.</p>
              </div>
              <div>
                <h3 className="text-xl font-playfair italic text-pink-500 mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" className="text-gray-600 hover:text-pink-500">
                    <Instagram size={20} />
                  </a>
                  <a href="mailto:contact@pinknaturalism.com" className="text-gray-600 hover:text-pink-500">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-playfair italic text-pink-500 mb-4">Visit</h3>
                <address className="text-gray-600 not-italic">
                  123 Fashion Avenue<br />
                  New York, NY 10001
                </address>
              </div>
            </div>

            <div className="text-center mt-16 text-gray-600">
              <p>&copy; {new Date().getFullYear()} pinknaturalism. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;