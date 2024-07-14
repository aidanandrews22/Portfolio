import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="mt-4">
      <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>About</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>Blog</NavLink></li>
        <li><NavLink to="/notes" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>Notes</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>Projects</NavLink></li>
        <li><NavLink to="/skills" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>Skills</NavLink></li>
        <li><NavLink to="/bookshelf" className={({ isActive }) => isActive ? "text-primary font-bold border-b-2 border-primary" : "text-primary hover:underline"}>Bookshelf</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;