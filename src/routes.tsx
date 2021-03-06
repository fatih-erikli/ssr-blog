import React from 'react';
import { App } from './App';
import { BLOG_POSTS_PREFIX } from './constants';
import { ServerSideContainer } from './containers/ServerSideContainer';
import { Post, Route } from './types';
import { checkPassword, concat } from './utils';

declare const BLOG: KVNamespace;

export const endsWith =
  (pattern: string) =>
  (text: string): boolean =>
    text.endsWith(pattern);
export const startsWith =
  (pattern: string) =>
  (text: string): boolean =>
    text.startsWith(pattern);
export const exactMatch =
  (pattern: string) =>
  (text: string): boolean =>
    text === pattern;

export const getRoutes = (): readonly Route[] => {
  return [
    {
      contentType: 'text/xml',
      match: exactMatch('/sitemap.xml'),
      handler: async () => {
        const postKeys = (await BLOG.list({ prefix: BLOG_POSTS_PREFIX })).keys;
        let posts = await Promise.all(
          postKeys.map((metadata) => BLOG.get(metadata.name, { type: 'json' })) as unknown as Promise<Post>[],
        );
        posts = posts.filter(Boolean);
        posts = posts.filter((post) => post.isListed);
        posts.sort((a, b) => {
          const date1 = new Date();
          date1.setFullYear(a.date[0]);
          date1.setMonth(a.date[1]);
          date1.setDate(a.date[2]);
          const date2 = new Date();
          date2.setFullYear(b.date[0]);
          date2.setMonth(b.date[1]);
          date2.setDate(b.date[2]);
          return date2.getTime() - date1.getTime();
        });
        return Promise.resolve(
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',

            ...posts.map((post) =>
              [
                '<url>',
                `<loc>https://fatih-erikli.com/${post.url}.html</loc>`,
                `<lastmod>${(([year, month, day]: [number, number, number]) => {
                  const date = new Date();
                  date.setFullYear(year);
                  date.setMonth(month);
                  date.setDate(day);
                  return date.toJSON();
                })(post.date)}</lastmod>`,
                '</url>',
              ].join('\n'),
            ),
            '</urlset>',
          ].join('\n'),
        );
      },
    },
    {
      contentType: 'text/plain',
      match: exactMatch('/robots.txt'),
      handler: () => Promise.resolve('Robots are allowed'),
    },
    {
      contentType: 'text/css',
      match: exactMatch('/style.css'),
      handler: () => Promise.resolve(''),
    },
    {
      contentType: 'text/html',
      match: exactMatch('/'),
      handler: async (request) => {
        let mailSent = null;
        const postKeys = (await BLOG.list({ prefix: BLOG_POSTS_PREFIX })).keys;
        let posts = await Promise.all(
          postKeys.map((metadata) => BLOG.get(metadata.name, { type: 'json' })) as unknown as Promise<Post>[],
        );
        posts = posts.filter(Boolean);
        posts = posts.filter((post) => post.isListed);
        posts.sort((a, b) => {
          const date1 = new Date();
          date1.setFullYear(a.date[0]);
          date1.setMonth(a.date[1]);
          date1.setDate(a.date[2]);
          const date2 = new Date();
          date2.setFullYear(b.date[0]);
          date2.setMonth(b.date[1]);
          date2.setDate(b.date[2]);
          return date2.getTime() - date1.getTime();
        });
        switch (request.method) {
          case 'POST':
            {
              const postData = await request.formData();
              const message = postData.get('message');
              const email = postData.get('email');
              if (message) {
                await fetch('https://api.postmarkapp.com/email', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Postmark-Server-Token': 'd6a9fbfc-3417-4da2-91f5-a96e6712470a',
                  },
                  body: JSON.stringify({
                    From: 'info@arbejdstakt.com',
                    To: 'info@arbejdstakt.com',
                    Subject: `Rate per hour ${postData.get('rate-per-hour')}`,
                    ReplyTo: email,
                    HtmlBody: message,
                    MessageStream: 'outbound',
                  }),
                });
                mailSent = true;
              } else {
                mailSent = false;
              }
            }
            break;
        }
        return <App page={{ name: 'home', content: { posts, mailSent } }} />;
      },
      container: ServerSideContainer,
      containerProps: {
        hydrateClientApplication: "/client.js",
        serverContent: {
        }
      },
    },
    {
      contentType: 'text/html',
      match: exactMatch('/admin'),
      handler: async () => {
        const postKeys = (await BLOG.list({ prefix: BLOG_POSTS_PREFIX })).keys;
        let posts = await Promise.all(
          postKeys.map((metadata) => BLOG.get(metadata.name, { type: 'json' })) as unknown as Promise<Post>[],
        );
        posts = posts.filter(Boolean).filter((post) => Boolean(post.date));
        posts.sort((a, b) => {
          const date1 = new Date();
          date1.setFullYear(a.date[0]);
          date1.setMonth(a.date[1]);
          date1.setDate(a.date[2]);
          const date2 = new Date();
          date2.setFullYear(b.date[0]);
          date2.setMonth(b.date[1]);
          date2.setDate(b.date[2]);
          return date2.getTime() - date1.getTime();
        });
        return <App page={{ name: 'admin', content: { posts: posts } }} />;
      },
      container: ServerSideContainer,
    },
    {
      contentType: 'text/html',
      match: startsWith('/admin/posts-edit/'),
      container: ServerSideContainer,
      handler: async (request) => {
        const url = new URL(request.url);
        const pathNameParts = url.pathname.split('/');
        const fileName = pathNameParts[pathNameParts.length - 1];
        let post = (await BLOG.get(concat(BLOG_POSTS_PREFIX, fileName), { type: 'json' })) as unknown as Post;
        let postUpdated = false;
        if (request.method === 'POST') {
          const formData = await request.formData();
          const password = formData.get('password');
          if (checkPassword(password as string)) {
            throw new Error('Wrong password.');
          }
          const title = formData.get('title');
          const isListed = formData.get('is-listed') === 'on';
          const content = formData.get('content');
          const year = formData.get('year');
          const month = formData.get('month');
          const day = formData.get('day');
          post = {
            title: title as string,
            url: post.url,
            content: content as string,
            date: [Number(year), Number(month), Number(day)],
            isListed,
          };
          await BLOG.put(`${BLOG_POSTS_PREFIX}${fileName}`, JSON.stringify(post));
          postUpdated = true;
        }
        return <App page={{ name: 'posts-edit', content: { post, postUpdated } }} />;
      },
    },
    {
      contentType: 'text/html',
      match: exactMatch('/admin/posts-new'),
      handler: async (request) => {
        let postAdded = false;
        if (request.method === 'POST') {
          const formData = await request.formData();
          const password = formData.get('password');
          if (checkPassword(password as string)) {
            throw new Error('Wrong password.');
          }
          const title = formData.get('title');
          const isListed = formData.get('is-listed') === 'on';
          const url = formData.get('file-name');
          const content = formData.get('content');
          const year = formData.get('year');
          const month = formData.get('month');
          const day = formData.get('day');
          await BLOG.put(
            `${BLOG_POSTS_PREFIX}${url}`,
            JSON.stringify({ title, url, content, date: [Number(year), Number(month), Number(day)], isListed }),
          );
          postAdded = true;
        }
        return Promise.resolve(<App page={{ name: 'posts-new', content: { postAdded } }} />);
      },
      container: ServerSideContainer,
    },
    {
      contentType: 'text/html',
      match: endsWith('.html'),
      handler: async (request) => {
        const url = new URL(request.url);
        const pathNameParts = url.pathname.split('/');
        let fileName = pathNameParts[pathNameParts.length - 1];
        fileName = fileName.replace('.html', '');
        const post = (await BLOG.get(concat(BLOG_POSTS_PREFIX, fileName), { type: 'json' })) as unknown as Post;
        return <App page={{ name: 'blog-detail', content: { post } }} />;
      },
      container: ServerSideContainer,
    },
    {
      contentType: 'text/html',
      match: () => true,
      handler: (path) => Promise.resolve(<div>not found</div>),
      container: ServerSideContainer,
    },
  ] as const;
};
