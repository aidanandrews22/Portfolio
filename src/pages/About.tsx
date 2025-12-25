import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";

import { Project as ProjectType } from "../components/ProjectCard";
import { type Research } from "../components/ResearchCard";
import { WhatDrivesMe, WhoDrivesMe } from "../components/about/DrivesMe";
import TLDR from "../components/tldr";
import AboutSection from "../components/about/AboutSec";
import ProjectsSection from "../components/about/ProjectSec";
import ResearchSection from "../components/about/ResearchSec";
import WorkExperienceSection from "../components/about/WorkExperience";
import EducationSection from "../components/about/Education";
import TechnicalExpertiseSection from "../components/about/TechnicalExpertise";
import RecentActivity from "../components/about/RecentActivity";
import RecentBlogSection from "../components/about/RecentBlogPost";
import Socials from "../components/about/Socials";
import ImportantDocuments from "../components/about/ImportantDocuments";

import GitHubChart from "../components/Git";
const currentProjectIds = [
  "voxed",
  "illini-plan",
  "manim-video-agent",
  "illini-spots",
];

const featuredResearchIds = ["g1", "so-101", "tfc"];

export default function About() {
  const [currentProjects, setCurrentProjects] = useState<ProjectType[]>([]);
  const [featuredResearch, setFeaturedResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [researchLoading, setResearchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [researchError, setResearchError] = useState<string | null>(null);

  useEffect(() => {
    // Add a class to the document to ensure dark mode is respected
    document.documentElement.classList.add("color-scheme-adaptive");

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/projects.json",
        );
        if (!response.ok) throw new Error("Failed to fetch projects");
        const allProjects = await response.json();
        const filteredProjects = allProjects.filter((project: ProjectType) =>
          currentProjectIds.includes(project.id),
        );
        setCurrentProjects(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects",
        );
        setLoading(false);
      }
    };

    const fetchResearch = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/research.json",
        );
        if (!response.ok) throw new Error("Failed to fetch research");
        const allResearch = await response.json();
        const filteredResearch = allResearch.filter((item: Research) =>
          featuredResearchIds.includes(item.id),
        );
        setFeaturedResearch(filteredResearch);
        setResearchLoading(false);
      } catch (error) {
        console.error("Error fetching research:", error);
        setResearchError(
          error instanceof Error ? error.message : "Failed to fetch research",
        );
        setResearchLoading(false);
      }
    };

    fetchProjects();
    fetchResearch();

    // Cleanup function
    return () => {
      document.documentElement.classList.remove("color-scheme-adaptive");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-16 pb-12 w-full"
    >
      <TLDR />
      <ImportantDocuments />
      <RecentActivity />
      <ResearchSection
        research={featuredResearch}
        loading={researchLoading}
        error={researchError}
      />
      <AboutSection />
      <WorkExperienceSection />
      <EducationSection />
      <GitHubChart username="aidanandrews22" />
      <ProjectsSection
        projects={currentProjects}
        loading={loading}
        error={error}
      />
      <RecentBlogSection />
      <Socials />
      <WhatDrivesMe />
      <WhoDrivesMe />
      <TechnicalExpertiseSection />
    </motion.div>
  );
}
