import { useEffect } from "react";

interface TwitterTweetProps {
  tweetId: string;
}

export default function TwitterTweet({ tweetId }: TwitterTweetProps) {
  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        My LinkedIn and discord have become flooded so I'm migrating to X
        (twitter). If u ever want to dm me do so here, and I will respond
      </p>
      &mdash; Aidan Andrews (@aidansandrews)
      <a
        href={`https://twitter.com/aidansandrews/status/${tweetId}?ref_src=twsrc%5Etfw`}
        target="_blank"
        rel="noopener noreferrer"
      >
        March 31, 2025
      </a>
    </blockquote>
  );
}
