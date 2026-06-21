import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import CreateJob from './pages/CreateJob';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [sessionJobs, setSessionJobs] = useState<any[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      // Scroll to top on page switches to preserve premium interaction feel
      window.scrollTo({ top: 0 });
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddNewJob = (newJob: any) => {
    // Save to active lists
    setSessionJobs((prev) => [newJob, ...prev]);
    // Redirect visually to marketplace feed
    window.location.hash = '#marketplace';
  };

  const renderActivePage = () => {
    switch (currentHash) {
      case '#marketplace':
        return <Marketplace customJobs={sessionJobs} />;
      case '#post-job':
        return (
          <CreateJob 
            onJobCreated={handleAddNewJob} 
            onNavigateBack={() => { window.location.hash = '#home'; }} 
          />
        );
      case '#home':
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
          <Navbar />
          {renderActivePage()}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
