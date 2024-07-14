import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-text-secondary mb-4">
          I stream myself working on <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">youtube</a>. 
          As a current student and a researcher focused on machine learning applications in physics and neuroscience, 
          I am deeply committed to using technology to solve complex problems. My academic and recreational projects 
          are where I try to apply my knowledge. I spend all of my time learning, researching, playing chess, and 
          exercising (mainly playing hockey).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">The Grainger College of Engineering</h3>
          <h4 className="text-lg">Project Manager & Course Assistant</h4>
          <p className="text-sm text-text-secondary">2024 - Present</p>
          <p className="mt-2">
            Managing projects and assisting courses within the CS department, focusing on enhancing 
            the educational experiences of undergraduate students through innovative approaches and technologies.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">NVRALONE</h3>
          <h4 className="text-lg">Founder & CEO</h4>
          <p className="text-sm text-text-secondary">2023 - Present</p>
          <p className="mt-2">
            Successfully led a clothing brand to $10,000 in profit per month, raised money for suicide prevention, 
            managed teams of over 20 employees, orchestrated pop-up shops, and developed and managed the website 
            including customer acquisition algorithms.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-semibold">University of Illinois Urbana-Champaign</h3>
          <p className="text-sm text-text-secondary">2023 - Present</p>
          <p className="mt-2">
            BS in Physics and Master of Science in Computer Science, focusing on machine learning, AI, 
            and their applications in physical sciences and neuroscience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;