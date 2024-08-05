import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { checkAuthState, signOutUser } from './auth';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
// import Footer from './components/layout/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import Notes from './pages/Notes';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Bookshelf from './pages/Bookshelf';
import SignIn from './components/auth/SignIn';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthState((user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = () => {
    signOutUser();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <div className="absolute top-0 right-0 m-4">
        {user ? (
          <a href="#" onClick={handleSignOut} className="text-xs">
            {user.displayName || user.email}
          </a>
        ) : (
          <Link to="/signin" className="text-xs">Sign In</Link>
        )}
      </div>
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
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;