import { marked } from 'marked';
import sha256 from 'js-sha256';
import { PASSWORD_SHA256 } from './constants';
export const stringifyDate = ([year, month, day]: [number, number, number]): string => {
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(day);
  return date.toJSON();
};

export const parseMarkdownContent = (content: string): string => {
  return marked.parse(content);
};

export const concat = (a: string, b: string): string => `${a}${b}`;
export const checkPassword = (password: string): boolean =>
  sha256.sha256(password as string) !== PASSWORD_SHA256;
