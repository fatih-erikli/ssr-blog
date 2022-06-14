import React, { FC } from 'react';
import { MarkdownContent } from '../components/MarkdownContent';
import { Post } from '../types';
import { stringifyDate } from '../utils';

export const Home: FC<{
  posts: Post[];
}> = ({ posts }) => {
  return (
    <div>
      <h3>Applications</h3>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
        <a href={'https://fatih-erikli.github.io/time-tracker'}>Timetracker <br/><span style={{color: "gray"}}>Time reporting tool for freelancers</span></a>
      </div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', marginTop: 5 }}>
        <a href={'https://fatih-erikli.github.io/sketchbook'}>Sketchbook <br/><span style={{color: "gray"}}>Distraction free drawing editor</span></a>
      </div>
      <h3>Blog</h3>
      {posts.length === 0 && <p>No data</p>}
      {posts.map((post) => (
        <div>
          <h2>
            <a href={post.url + '.html'}>{post.title}</a>
          </h2>
          <MarkdownContent content={post.content} />
          <time dateTime={stringifyDate(post.date)}>{post.date.join('-')}</time>
        </div>
      ))}
    </div>
  );
};
