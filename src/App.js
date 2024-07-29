import AWS from 'aws-sdk';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider, useDataContext } from './context/DataContext';
import { fetchAllData } from './services/DataService';
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import Notes from './pages/Notes';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Bookshelf from './pages/Bookshelf';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:bd158a59-aec2-4ecf-b9b1-24abf85afc14'
  })
});

// Ensure credentials are refreshed
AWS.config.credentials.get(function(err) {
  if (err) {
    console.error("Error refreshing AWS credentials", err);
  } else {
    console.log("Successfully logged in");
  }
});

// Initialize S3 and Lambda with the same credentials
export const s3 = new AWS.S3({
  params: { Bucket: 'aidanandrews-content' }
});

export const lambda = new AWS.Lambda();


const AppContent = () => {
  const { updateData, setLoading, setError, loading, error } = useDataContext();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { posts, notes } = await fetchAllData();
        updateData(posts, notes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Header />
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/notes/*" element={<Notes />} />
          <Route path="/projects/*" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
