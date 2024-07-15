import React from 'react';

const CoverLetter = () => (
  <section id="cover-letter" style={{ display: 'none' }}>
    <a href="assets/PDF/cover-letter.pdf" target="_blank" className="pdfLink mobile-only">View Cover Letter</a>
    <iframe className="desktop-only" src="assets/PDF/cover-letter.pdf" width="100%" height="1000"></iframe>
  </section>
);

export default CoverLetter;
