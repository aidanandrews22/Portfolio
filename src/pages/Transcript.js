import React, { useState } from 'react';

const Transcript = () => {
  const [transcriptSrc, setTranscriptSrc] = useState('assets/PDF/Aidan Andrews Unofficial Transcript.pdf');

  return (
    <section id="transcripts" style={{ display: 'none' }}>
      <a href="assets/PDF/Aidan Andrews Unofficial Transcript.pdf" target="_blank" className="pdfLink mobile-only">View Unofficial</a>
      <a href="assets/PDF/Aidan Andrews Official Transcript.pdf" target="_blank" className="pdfLink mobile-only">View Official</a>
      <nav>
        <button onClick={() => setTranscriptSrc('assets/PDF/Aidan Andrews Unofficial Transcript.pdf')}>Unofficial</button>
        <button onClick={() => setTranscriptSrc('assets/PDF/Aidan Andrews Official Transcript.pdf')}>Official</button>
      </nav>
      <iframe id="transcriptFrame" className="desktop-only" src={transcriptSrc} width="100%" height="1000"></iframe>
    </section>
  );
};

export default Transcript;
