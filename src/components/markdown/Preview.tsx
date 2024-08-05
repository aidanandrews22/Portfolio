import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import RemarkCode from './RemarkCode';
import { defaultSchema } from 'hast-util-sanitize';
import 'github-markdown-css/github-markdown.css';

interface PreviewProps {
  doc: string;
}

const Preview: React.FC<PreviewProps> = ({ doc }) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact as any, {
      createElement: React.createElement,
      sanitize: defaultSchema,
      remarkReactComponents: {
        code: RemarkCode
      }
    })
    .processSync(doc).result as React.ReactNode;

  return <div className="preview markdown-body">{md}</div>;
};

export default Preview;