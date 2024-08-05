import React, { useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Import languages as needed
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);

const RemarkCode = ({ children, className, inline }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return !inline ? (
    <div className="relative">
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className="absolute top-2 right-2 p-1 rounded bg-gray-800 text-white opacity-50 hover:opacity-100 transition-opacity">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        style={oneDark}
        language={lang}
        PreTag="div"
        className="rounded-md"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className}>{children}</code>
  );
};

export default RemarkCode;