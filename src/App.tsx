import React, { FC } from 'react';
import { Admin } from './pages/Admin';
import { BlogDetail } from './pages/BlogDetail';
import { Home } from './pages/Home';
import { PostsEdit } from './pages/PostsEdit';
import { PostsNew } from './pages/PostsNew';
import { Page } from './types';

export const App: FC<{
  page: Page;
}> = ({ page }) => {
  let pageContent;
  switch (page.name) {
    case 'posts-edit':
      pageContent = <PostsEdit post={page.content.post} postUpdated={page.content.postUpdated} />;
      break;
    case 'posts-new':
      pageContent = <PostsNew postAdded={page.content.postAdded} />;
      break;
    case 'admin':
      pageContent = <Admin posts={page.content.posts} />;
      break;
    case 'home':
      pageContent = <Home posts={page.content.posts} />;
      break;
    case 'blog-detail':
      pageContent = <BlogDetail content={{ post: page.content.post }} />;
      break;
  }
  return (
    <div style={{ padding: '1rem', maxWidth: 900, margin: 'auto' }}>
      <h1><a href={'/'}>Fatih Erikli</a></h1>
      {pageContent}
    </div>
  );
};
