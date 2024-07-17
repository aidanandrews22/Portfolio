import React from 'react';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto shadow-md rounded-b-lg">
        <div className="py-6 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold">Aidan Andrews</h1>
              <h2 className="text-xl text-text-secondary">Physics and Machine Learning Enthusiast, Aspiring Researcher</h2>
              <p className="text-sm mt-2">Cedar Rapids, Iowa, United States</p>
              <div className="mt-2 space-x-2">
                <a href="mailto:aidansa2@illinois.edu" className="text-primary hover:underline">Email |</a>
                <a href="tel:+13109104721" className="text-primary hover:underline">Phone |</a>
                <a href="https://linkedin.com/in/aidanandrewss" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn |</a>
                <a href="https://github.com/aidanandrews22" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub |</a>
                <a href="https://www.instagram.com/aidanandrewss/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram |</a>
                <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a>
              </div>
            </div>
            <img src='assets/header.png' alt="Aidan Andrews" className="w-32 h-32 rounded-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;