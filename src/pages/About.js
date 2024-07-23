import React from 'react';
import Skills from './Skills';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-text-secondary mb-4">
          I stream myself working on <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-primary">youtube</a>. 
          As a current student and a researcher focused on machine learning applications in physics and neuroscience, 
          I am deeply committed to using technology to solve complex problems. My academic and recreational projects 
          are where I try to apply my knowledge. I spend all of my time learning, researching, playing chess, and 
          exercising (mainly playing hockey and tennis).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Documents</h2>
        <div className="mt-2 space-x-5">
          <a href={`${process.env.PUBLIC_URL}/assets/PDF/Aidan_Andrews_Official_Transcript.pdf`} target="_blank" rel="noopener noreferrer" className="text-primary">Official-Transcript</a>
          <a href={`${process.env.PUBLIC_URL}/assets/PDF/Aidan_Andrews_Unofficial_Transcript.pdf`} target="_blank" rel="noopener noreferrer" className="text-primary">Unofficial-Transcript</a>
          <a href={`${process.env.PUBLIC_URL}/assets/PDF/Aidan_Andrews_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="text-primary">Resume</a>
          <a href={`${process.env.PUBLIC_URL}/assets/PDF/cover-letter.pdf`} target="_blank" rel="noopener noreferrer" className="text-primary">Cover Letter</a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Startup (signed an NDA)</h3>
          <h4 className="text-lg">Machine Learning Researcher/Engineer</h4>
          <p className="text-sm text-text-secondary">2024 - Present</p>
          <p className="mt-2">
            Implementing a various amount of models for a chatbot. The models include (but are not limited to) intent
            classification, retrieval augmented generation, and llm's. I am running an llm locally with dedicated prompt
            engineering algorithms and RAG algorithms.<br></br>Relevant notes: <a href="https://aidanandrews.info/notes/note1721519215188" target='_blank'>Intent Classification Overview</a>, <a href="https://aidanandrews.info/notes/note1720138895991" target='_blank'>Researching Rag</a>, <a href="https://aidanandrews.info/notes/note1720467342277" target='_blank'>Building Rag</a>, <a href="https://aidanandrews.info/notes/note1720910307291" target='_blank'>New Rag</a>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Dr. Andrews Plastic Surgery</h3>
          <h4 className="text-lg">Machine Learning Researcher/Intern</h4>
          <p className="text-sm text-text-secondary">2024 - Present</p>
          <p className="mt-2">
            Researching machine learning models to predict the effectiveness of procedures based off of a generalized
            score given to patients. Essentially, the model will take variables like age, gender, resting heart rate,
            and a plethera of other medically derived data like medications. Then uses previous patient data to predict
            how effective a procedure will be given the patients input variable, then quantifying the result as a normalized
            score.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">The Grainger College of Engineering</h3>
          <h4 className="text-lg">Project Manager & Course Assistant</h4>
          <p className="text-sm text-text-secondary">December 2023 - May 2024</p>
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
          <p className="text-sm text-text-secondary">2023 - 2026</p>
          <p className="mt-2">
            Studying B.S. in Physics from the Grainger College of Engineering. Planning on adding a double major
            in Math+CS from the college of Liberal Arts and Sciences.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <Skills />
      </section>
    </div>
  );
};

export default About;
