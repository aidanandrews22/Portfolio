import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ResearchCard, { type Research } from "../components/ResearchCard";

export default function Research() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/research.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResearch(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching research:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch research",
        );
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    research.forEach((item) => {
      item.tags.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [research]);

  const filteredResearch = useMemo(() => {
    if (!selectedTag) return research;
    return research.filter((item) => item.tags.includes(selectedTag));
  }, [research, selectedTag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Loading research...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">Error: {error}</p>
        <p className="text-sm">Please try refreshing the page</p>
      </div>
    );
  }

  if (!research.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">No research found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Research</h1>
        <FilterDropdown
          options={availableTags}
          selectedOption={selectedTag}
          onSelect={setSelectedTag}
          label="Filter by Tag"
        />
      </div>

      <div className="space-y-6">
        {filteredResearch.map((item, index) => (
          <ResearchCard key={item.id} research={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

