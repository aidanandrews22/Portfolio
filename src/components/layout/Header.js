import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">Aidan Andrews</h1>
            <h2 className="text-xl text-text-secondary">Physics and Machine Learning Enthusiast, Aspiring Researcher</h2>
            <p className="text-sm mt-2">Cedar Rapids, Iowa, United States</p>
            <div className="mt-2 space-x-2">
              <a href="mailto:aidansa2@illinois.edu" className="text-primary hover:underline">aidansa2@illinois.edu</a>
              <a href="tel:+13109104721" className="text-primary hover:underline">+1 (310) 910-4721</a>
              <a href="https://linkedin.com/in/aidanandrewss" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
            </div>
          </div>
          <img src='assets/header.png' alt="Aidan Andrews" className="w-32 h-32 rounded-full object-cover" />
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;