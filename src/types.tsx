import React, { FC, ReactNode } from 'react';
export type ContentType = 'text/html' | 'text/plain';

export type Route =
  | {
      contentType: 'text/css';
      match: (pathName: string) => boolean;
      handler: (request: Request) => Promise<string>;
    }
  | {
      contentType: 'text/html';
      match: (pathName: string) => boolean;
      handler: (request: Request) => Promise<ReactNode>;
      container: FC<{ children: ReactNode }>;
    }
  | {
      contentType: 'text/xml';
      match: (pathName: string) => boolean;
      handler: (request: Request) => Promise<string>;
    }
  | {
      contentType: 'text/plain';
      match: (pathName: string) => boolean;
      handler: (request: Request) => Promise<string>;
    };

export type RouterContextType = {
  currentPath: string;
  navigate: (path: string) => void;
};

export type Post = {
  title: string;
  content: string;
  date: [year: number, month: number, day: number];
  url: string;
  isListed: boolean;
};

export type Page =
  | {
      name: 'home';
      content: {
        posts: Post[];
      };
    }
  | {
      name: 'blog-detail';
      content: {
        post: Post;
      };
    }
  | {
      name: 'admin';
      content: {
        posts: Post[];
      };
    }
  | {
      name: 'posts-new';
      content: { postAdded: boolean };
    }
  | {
      name: 'posts-edit';
      content: { post: Post; postUpdated: boolean };
    };
