import React from 'react';

const Resume = () => (
  <section id="resume">
    <a href="assets/PDF/Aidan Andrews Resume.pdf" target="_blank" rel="noopener noreferrer" className="pdfLink mobile-only">View Resume</a>
    <iframe title="resume-pdf" className="desktop-only" src="assets/PDF/Aidan Andrews Resume.pdf" width="100%" height="1000"></iframe>
  </section>
);

export default Resume;
