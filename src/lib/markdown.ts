import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMarkdownContent(locale = 'en') {
  const filePath = path.join(process.cwd(), 'content', `index.${locale}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);
  return { content, data };
}
