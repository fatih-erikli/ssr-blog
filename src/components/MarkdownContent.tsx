import React, { FC } from 'react';
import { parseMarkdownContent } from '../utils';

export const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  [content] = content.split('[content]')
  return (
    <div
      style={{ }}
      dangerouslySetInnerHTML={{
        __html: parseMarkdownContent(content),
      }}
    />
  );
};
