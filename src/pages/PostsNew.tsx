import React, { FC } from 'react';

export const PostsNew: FC<{
  postAdded: boolean;
}> = ({ postAdded }) => {
  return (
    <div>
      {postAdded && <p style={{ color: 'green' }}>Post added.</p>}
      <form action="/admin/posts-new" method="post">
        <label>
          Title <br />
          <input name={'title'} type={'text'} />
        </label>
        <label>
          File name <br />
          <input name={'file-name'} type={'text'} /> .html
        </label>
        <label>
          Content <br />
          <textarea name={'content'} rows={20} cols={40} />
        </label>
        <label>
          Date <br />
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <select name={'year'}>
              {new Array(20).fill(0).map((_, index) => (
                <option value={2025 - index}>{2025 - index}</option>
              ))}
            </select>
            <select name={'month'}>
              {new Array(12).fill(0).map((_, index) => (
                <option value={12 - index}>{12 - index}</option>
              ))}
            </select>
            <select name={'day'}>
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
          <input type={"checkbox"} name="is-listed" />
        </label>
        <input type={'submit'} value={'Submit'} />
      </form>
    </div>
  );
};
