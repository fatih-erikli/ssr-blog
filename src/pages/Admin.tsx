import React, { FC } from 'react';
import { Post } from '../types';

export const Admin: FC<{
  posts: Post[];
}> = ({ posts }) => {
  return (
    <div>
      <a href="/admin/posts-new">New post</a>
      {posts.length === 0 && <div>No data.</div>}
      {posts.map((post) => (
        <div style={{ paddingBottom: '1rem' }}>
          <time>{post.date.join('-')}</time>
          <p>{post.title}</p>
          <p>
            <a href={`/admin/posts-edit/${post.url}`}>Edit</a> {post.url}.html
          </p>
        </div>
      ))}
    </div>
  );
};
