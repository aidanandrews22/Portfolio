import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="border-b border-gray-200 pb-4">
          <Link to={`/blog/${post.id}`} className="text-xl font-semibold text-primary hover:underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-700">{post.summary}</p>
          <Link to={`/blog/${post.id}`} className="text-primary hover:underline mt-2 inline-block">
            Read more
          </Link>
        </article>
      ))}
    </div>
  );
};

export default PostList;