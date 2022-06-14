import React, { FC } from 'react';
import { parseMarkdownContent } from '../utils';

export const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  // content = JSON.parse(JSON.stringify(content));
  return (
    <div
      style={{ }}
      dangerouslySetInnerHTML={{
        __html: parseMarkdownContent(content),
      }}
    />
  );
};
