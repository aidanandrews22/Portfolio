import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogPostCard, { BlogPost as BlogPostType } from '../BlogPostCard';

export default function RecentBlogSection() {
    const [recentPost, setRecentPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRecentPost = async () => {
        try {
          const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json');
          if (!response.ok) throw new Error('Failed to fetch blog posts');
          const posts = await response.json();
          
          // Sort posts by date and get the most recent one
          try {
            const sortedPosts = posts.sort((a: BlogPostType, b: BlogPostType) => {
              try {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              } catch (err) {
                console.error('Error sorting post dates:', err);
                return 0; // Keep original order if date comparison fails
              }
            });
            
            if (sortedPosts && sortedPosts.length > 0) {
              setRecentPost(sortedPosts[0]);
            } else {
              throw new Error('No blog posts found');
            }
          } catch (err) {
            console.error('Error processing posts data:', err);
            throw err;
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching recent blog post:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch recent blog post');
          setLoading(false);
        }
      };
  
      fetchRecentPost();
    }, []);
  
    if (loading) return (
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Recent Blog Post</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      </section>
    );
    
    if (error) return (
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Recent Blog Post</h2>
        <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
          <p className="mt-2 text-sm">Please try refreshing the page or check back later.</p>
        </div>
      </section>
    );
    
    if (!recentPost) return null;
  
    return (
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Recent Blog Post</h2>
          <Link to="/blog" className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors">
            View all →
          </Link>
        </div>
        
        <div className="prose prose-adaptive prose-lg max-w-none mb-6">
          <p className="leading-relaxed">
            Writing and research allow me to explore ideas in depth and share my discoveries with others. My blog is where I document 
            my learning journey, share technical insights, and occasionally dive into philosophical questions about technology and its 
            impact. Below is my most recent post – a window into what's currently capturing my attention.
          </p>
        </div>
        
        <BlogPostCard post={recentPost} compact={true} />
        
        <div className="text-center pt-2">
          <p className="text-sm opacity-80 italic">
            I try to write regularly about my research findings, interesting technical challenges, and thoughts on technology's future.
            My goal is to share knowledge that's both insightful and accessible.
          </p>
        </div>
      </section>
    );
};
