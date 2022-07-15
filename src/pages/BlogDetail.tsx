import React, { FC } from 'react';
import { MarkdownContent } from '../components/MarkdownContent';
import { Post } from '../types';
import { stringifyDate } from '../utils';

export const BlogDetail: FC<{
  content: {
    post: Post;
  };
}> = ({ content }) => {
  return (
    <>
      <h2>{content.post.title}</h2>
      <div className="post-header">
        <time dateTime={stringifyDate(content.post.date)}>{content.post.date.join('-')}</time>
      </div>
      <MarkdownContent preview={false} content={content.post.content} />
    </>
  );
};
