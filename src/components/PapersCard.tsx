import { BlogPost } from "./BlogPostCard";
import BlogPostCard from "./BlogPostCard";

interface PublicationCardProps {
  post: BlogPost;
  index?: number;
  compact?: boolean;
}

export default function PublicationCard({
  post,
  index = 0,
  compact = false,
}: PublicationCardProps) {
  // Create a new post object with filtered tags that exclude "Pub"
  const filteredPost = {
    ...post,
    tags: filterOutPubTag(post.tags),
  };

  return <BlogPostCard post={filteredPost} index={index} compact={compact} />;
}

// Helper function to filter out the "Pub" tag
function filterOutPubTag(
  tags: string[] | string | undefined,
): string[] | string {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.filter((tag) => tag !== "Pub");
  } else if (typeof tags === "string") {
    try {
      // Try to parse if it's a JSON string
      const parsedTags = JSON.parse(tags);
      if (Array.isArray(parsedTags)) {
        return JSON.stringify(
          parsedTags.filter((tag: string) => tag !== "Pub"),
        );
      }
    } catch {
      // If not parseable, check if the string is "Pub"
      return tags === "Pub" ? "" : tags;
    }
  }

  return [];
}
