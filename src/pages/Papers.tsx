import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import PublicationCard from "../components/PapersCard";
import { BlogPost } from "../components/BlogPostCard";

export default function Papers() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchParams] = useSearchParams();

  // Initialize filters from URL parameters
  useEffect(() => {
    const tagFromUrl = searchParams.get("tag") || "";
    const typeFromUrl = searchParams.get("type") || "";
    setSelectedTag(tagFromUrl);
    setSelectedType(typeFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json",
    )
      .then((res) => res.json())
      .then((data) => {
        try {
          // Filter for papers (posts with "Pub" tag)
          const publicationPosts = data.filter((post: BlogPost) => {
            try {
              if (Array.isArray(post.tags)) {
                return post.tags.includes("Pub");
              } else if (typeof post.tags === "string") {
                try {
                  // Try to parse if it's a JSON string
                  const parsedTags = JSON.parse(post.tags);
                  return (
                    Array.isArray(parsedTags) && parsedTags.includes("Pub")
                  );
                } catch {
                  // If not parseable, check if the string is "Pub"
                  return post.tags === "Pub";
                }
              }
              return false;
            } catch (err) {
              console.error("Error processing post tags:", post.id, err);
              return false;
            }
          });

          // Sort papers by date, newest first
          const sortedPosts = publicationPosts.sort(
            (a: BlogPost, b: BlogPost) => {
              try {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              } catch (err) {
                console.error("Error sorting publication dates:", err);
                return 0; // Keep original order if date comparison fails
              }
            },
          );
          setPosts(sortedPosts);
        } catch (err) {
          console.error("Error processing papers data:", err);
          setPosts([]); // Set empty array to avoid undefined errors
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching papers:", error);
        setError("Failed to load papers. Please try again later.");
        setLoading(false);
      });
  }, []);

  const availableTags = useMemo(() => {
    try {
      const tags = new Set<string>();
      posts.forEach((post) => {
        try {
          if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
            post.tags.forEach((tag) => {
              // Exclude the "Pub" tag from the filter options
              if (tag && typeof tag === "string" && tag !== "Pub") {
                tags.add(tag);
              }
            });
          }
        } catch (err) {
          console.error("Error processing tags for publication:", post.id, err);
        }
      });
      return Array.from(tags).sort();
    } catch (err) {
      console.error("Error generating available tags:", err);
      return [];
    }
  }, [posts]);

  const availableTypes = useMemo(() => {
    try {
      const types = new Set<string>();
      posts.forEach((post) => {
        if (post.type && typeof post.type === "string") {
          types.add(post.type.toUpperCase());
        }
      });
      return Array.from(types).sort();
    } catch (err) {
      console.error("Error generating available types:", err);
      return [];
    }
  }, [posts]);

  const filteredPosts = useMemo(() => {
    try {
      return posts.filter((post) => {
        // Filter by tag if selected (excluding the Pub tag)
        const matchesTag =
          !selectedTag ||
          (post.tags &&
            Array.isArray(post.tags) &&
            post.tags.includes(selectedTag));

        // Filter by type if selected
        const matchesType =
          !selectedType ||
          (post.type && post.type.toUpperCase() === selectedType);

        return matchesTag && matchesType;
      });
    } catch (err) {
      console.error("Error filtering papers:", err);
      return posts; // Return all posts if filtering fails
    }
  }, [posts, selectedTag, selectedType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Loading papers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-4xl font-bold">Papers</h1>
        <div className="flex flex-wrap gap-3">
          {availableTags.length > 0 && (
            <FilterDropdown
              options={availableTags}
              selectedOption={selectedTag}
              onSelect={setSelectedTag}
              label="Tag"
              paramName="tag"
            />
          )}
          {availableTypes.length > 0 && (
            <FilterDropdown
              options={availableTypes}
              selectedOption={selectedType}
              onSelect={setSelectedType}
              label="Type"
              paramName="type"
            />
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p>
            No papers found
            {selectedTag ? ` with tag "${selectedTag}"` : ""}
            {selectedType ? ` of type "${selectedType}"` : ""}.
          </p>
          {(selectedTag || selectedType) && (
            <button
              onClick={() => {
                setSelectedTag("");
                setSelectedType("");
              }}
              className="mt-4 px-4 py-2 text-sm rounded-lg bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post, index) => (
            <PublicationCard key={post.id || index} post={post} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
