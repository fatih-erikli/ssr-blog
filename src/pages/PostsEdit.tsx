import React, { FC } from 'react';
import { Post } from '../types';

export const PostsEdit: FC<{
  post: Post;
  postUpdated: boolean;
}> = ({ post, postUpdated }) => {
  return (
    <div>
      {postUpdated && <p style={{ color: 'green' }}>Post updated.</p>}
      <form action={`/admin/posts-edit/${post.url}`} method="post">
        <label>
          Title <br />
          <input name={'title'} value={post.title} type={'text'} />
        </label>
        <label>
          File name <br />
          {post.url}.html
        </label>
        <label>
          Content <br />
          <textarea name={'content'} rows={20} cols={40} value={post.content} />
        </label>
        <label>
          Date <br />
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <select name={'year'} value={String(post.date[0])}>
              {new Array(20).fill(0).map((_, index) => (
                <option value={2025 - index}>{2025 - index}</option>
              ))}
            </select>
            <select name={'month'} value={String(post.date[1])}>
              {new Array(12).fill(0).map((_, index) => (
                <option value={12 - index}>{12 - index}</option>
              ))}
            </select>
            <select name={'day'} value={String(post.date[2])}>
              {new Array(31).fill(0).map((_, index) => (
                <option value={31 - index}>{31 - index}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
          Password <br />
          <input type={"password"} name="password" />
        </label>
        <label>
          Is Listed? <br />
          <input type={"checkbox"} checked={post.isListed} name="is-listed" />
        </label>
        <input type={'submit'} value={'Update'} />
      </form>
    </div>
  );
};
