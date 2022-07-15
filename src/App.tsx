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
      pageContent = <Home posts={page.content.posts} mailSent={page.content.mailSent} />;
      break;
    case 'blog-detail':
      pageContent = <BlogDetail content={{ post: page.content.post }} />;
      break;
  }
  return (
    <div className={`page-container page-container--${page.name}`}>
      <h1 className="page-header">
        Full-stack Software Developer
        <br />
        <a href="/" style={{ textAlign: 'left', fontSize: '3rem' }}>
          Fatih Erikli
        </a>
      </h1>
      {pageContent}
      <script
        dangerouslySetInnerHTML={{
          __html: `var SERVER_CONTENT = ${JSON.stringify(page.content)}`,
        }}
      ></script>
      <footer>
        Fatih Erikli, 2022 <br />
        <a rel={'nofollow'} target={'_blank'} href={'https://instagram.com/fatiherikliuniq'}>
          instagram.com/fatiherikliuniq
        </a>
        . <br />
        <a rel={'nofollow'} target={'_blank'} href={'https://twitter.com/fatiherikliuniq'}>
          twitter.com/fatiherikliuniq
        </a>
        . <br />
        <a rel={'nofollow'} target={'_blank'} href={'https://github.com/fatih-erikli'}>
          github.com/fatih-erikli
        </a>
        .
      </footer>
    </div>
  );
};
