import React, { FC } from 'react';
import { parseMarkdownContent } from '../utils';

export const MarkdownContent: FC<{ content: string; preview: boolean }> = ({ content, preview }) => {
  if (preview) {
    [content] = content.split('[content]');
  } else {
    content = content.replace('[content]', '');
  }
  return (
    <div
      style={{}}
      dangerouslySetInnerHTML={{
        __html: parseMarkdownContent(content),
      }}
    />
  );
};
