import React, { FC, useState } from 'react';
import { MarkdownContent } from '../components/MarkdownContent';
import { Post } from '../types';
import { stringifyDate } from '../utils';

export const Home: FC<{
  posts: Post[];
  mailSent: boolean | null;
}> = ({ posts, mailSent }) => {
  const [ratePerHour, setRatePerHour] = useState<number>(45);
  return (
    <div className='home-page'>
      <div>
        <div className="projects">
          <h2 className="main-title">Projects</h2>
          <div className="project-item">
            <a
              href={'https://arbejdstakt.com/'}
              className="project-symbol"
              style={{ backgroundColor: '#4345ea', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            ></a>
            <a className="project-link" href={'https://arbejdstakt.com/'}>
              Arbejdstakt
              <span className="project-description">Time tracker</span>
            </a>
          </div>
          <div className="project-item">
            <a
              href={'https://fatih-erikli.github.io/sketchbook'}
              className="project-symbol"
              style={{ backgroundColor: '#ffc28c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            ></a>
            <a className="project-link" href={'https://fatih-erikli.github.io/sketchbook'}>
              Sketchbook
              <span className="project-description">Drawing app</span>
            </a>
          </div>
        </div>
        <div className="contact">
          <h2 className="main-title">Contact me</h2>
          {mailSent !== null &&
            (mailSent ? (
              <p style={{ color: 'green' }}>Mail sent. I will get back to you soon. Thanks!</p>
            ) : (
              <p style={{ color: 'red' }}>Fill the blanks.</p>
            ))}
          <form action={'/'} method={'post'}>
            <p>
              <label>
                <input value={'work'} defaultChecked type={'radio'} name={'reason'} /> I would like to work with you
              </label>
              <label>
                <input value={'other'} type={'radio'} name={'reason'} /> I want to say hello
              </label>
            </p>
            <p>
              <label htmlFor="email">Your email address</label>
              <input style={{ margin: 0 }} name={'email'} type={'email'} />
            </p>
            <p>
              <label htmlFor="rate-per-hour">
                If you are willing to work with me, how much rate per hour do you offer?
              </label>
              <input
                style={{ margin: 0 }}
                onChange={(event) => {
                  setRatePerHour(Number(event.target.value));
                }}
                name={'rate-per-hour'}
                type={'range'}
                min={0}
                max={200}
                value={ratePerHour}
              />
              <output htmlFor="rate-per-hour">{new Array(ratePerHour).fill('☕️').join(String.fromCharCode(32))}</output>
            </p>
            <label htmlFor="project-about">Your message</label>
            <textarea name={'message'} />
            <input type={'submit'} value={'Send'} />
          </form>
        </div>
      </div>
      <div>
        <h2 className="main-title">Blog</h2>
        {posts.length === 0 && <p>No data</p>}
        {posts.map((post) => (
          <div className="home-blog-post" key={post.url}>
            <h2>
              <a href={post.url + '.html'}>{post.title}</a>
            </h2>
            <time dateTime={stringifyDate(post.date)}>{post.date.join('-')}</time>
            <MarkdownContent preview={true} content={post.content} />
          </div>
        ))}
      </div>
    </div>
  );
};
