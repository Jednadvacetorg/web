import Parser from 'rss-parser';
import TurndownService from 'turndown';
import axios from 'axios';
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/blog-articles');
const PUBLIC_BLOG_DIR = path.join(ROOT, 'public/blog');

const RSS_URL = 'https://jednadvacet.org/rss';
const BASE_URL = 'https://jednadvacet.org';
const PEOPLE_DIR = path.join(ROOT, 'content/people');
const MAX_PAGES = 10;

function extractAuthor(item: any): string {
  const author = item.creator || item.author || item['dc:creator'];
  if (author) {
    return slugify(author, { lower: true, strict: true });
  }
  return 'apin';
}

async function ensureAuthorPage(authorSlug: string) {
  const authorPath = path.join(PEOPLE_DIR, `${authorSlug}.md`);
  try {
    await fs.access(authorPath);
    console.log(`  Author ${authorSlug} already exists`);
  } catch {
    const frontmatter = [
      '---',
      `title: ${authorSlug}`,
      'avatar: ',
      '---',
      '',
      ''
    ].join('\n');
    await fs.writeFile(authorPath, frontmatter, 'utf-8');
    console.log(`  Created author page: ${authorSlug}`);
  }
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

turndownService.addRule('image', {
  filter: 'img',
  replacement: function(_, node) {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    return `![${alt}](${src})`;
  }
});

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function extractCategories(item: any): string[] {
  const categories = item.categories || [];
  if (categories.length === 0) {
    return ['uncategorized'];
  }
  return categories;
}

function extractDate(item: any): string {
  if (item.isoDate) {
    const date = new Date(item.isoDate);
    return date.toISOString().split('T')[0];
  }
  if (item.pubDate) {
    const date = new Date(item.pubDate);
    return date.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

function extractSlug(title: string, date: string): string {
  return slugify(title, { lower: true, strict: true });
}

async function downloadImage(imageUrl: string, slug: string, index: number): Promise<string | null> {
  try {
    const urlObj = new URL(imageUrl);
    const pathname = urlObj.pathname;
    const originalFilename = path.basename(pathname);
    const ext = path.extname(originalFilename) || '.jpg';
    const nameWithoutExt = path.basename(originalFilename, ext);
    
    const newFilename = `${slug}-${nameWithoutExt}-${index}${ext}`;
    const localPath = path.join(PUBLIC_BLOG_DIR, newFilename);
    
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });
    
    await fs.writeFile(localPath, response.data);
    console.log(`  Downloaded: ${newFilename}`);
    
    return `/blog/${newFilename}`;
  } catch (error) {
    console.log(`  Failed to download: ${imageUrl}`);
    return null;
  }
}

async function processImages(content: string, slug: string): Promise<string> {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  const images: { original: string; url: string }[] = [];
  
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push({ original: match[0], url: match[1] });
  }
  
  let processedContent = content;
  
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (img.url.startsWith('http')) {
      const localUrl = await downloadImage(img.url, slug, i);
      if (localUrl) {
        processedContent = processedContent.replace(img.original, `![image](${localUrl})`);
      }
    } else if (img.url.startsWith('/wp-content/')) {
      const fullUrl = BASE_URL + img.url;
      const localUrl = await downloadImage(fullUrl, slug, i);
      if (localUrl) {
        processedContent = processedContent.replace(img.original, `![image](${localUrl})`);
      }
    }
  }
  
  return processedContent;
}

function processLinks(content: string): string {
  let processed = content.replace(new RegExp(BASE_URL, 'g'), '');
  processed = processed.replace(/href="\//g, 'href="');
  processed = processed.replace(/!\\\[/g, '![');
  processed = processed.replace(/\\\]/g, ']');
  return processed;
}

async function processItem(item: any) {
  const title = item.title || 'Untitled';
  const date = extractDate(item);
  const categories = extractCategories(item);
  const authorSlug = extractAuthor(item);
  const slug = extractSlug(title, date);
  
  console.log(`\nProcessing: ${title}`);
  console.log(`  Date: ${date}, Slug: ${slug}, Author: ${authorSlug}`);
  
  await ensureAuthorPage(authorSlug);
  
  const contentHtml = item['content:encoded'] || item.content || item.description || '';
  
  const contentWithLocalImages = contentHtml.replace(
    /src="(\/wp-content\/[^"]+)"/g,
    `src="${BASE_URL}$1"`
  );
  
  const contentWithProcessedImages = await processImages(contentWithLocalImages, slug);
  
  const markdownBody = turndownService.turndown(contentWithProcessedImages);
  
  const markdownContent = processLinks(markdownBody);
  
  const fileName = `${date}.${slug}.md`;
  const filePath = path.join(CONTENT_DIR, fileName);
  
  const frontmatter = [
    '---',
    `title: ${title}`,
    'categories:',
    ...categories.map((cat: string) => `  - ${cat}`),
    'authors:',
    `  - ${authorSlug}`,
    `redirect_from:`,
    `  - /${slug}/`,
    '---',
    '',
    ''
  ].join('\n');
  
  const finalContent = frontmatter + markdownContent;
  
  await fs.writeFile(filePath, finalContent, 'utf-8');
  console.log(`  Created: ${fileName}`);
}

async function fetchAllItems(): Promise<any[]> {
  const allItems: any[] = [];
  const parser = new Parser({
    customFields: {
      item: ['content:encoded', 'categories']
    }
  });

  for (let page = 1; page <= MAX_PAGES; page++) {
    const pageUrl = page === 1 ? RSS_URL : `${RSS_URL}?paged=${page}`;
    console.log(`Fetching page ${page}: ${pageUrl}`);
    
    try {
      const feed = await parser.parseURL(pageUrl);
      if (!feed.items || feed.items.length === 0) {
        console.log(`No more items on page ${page}, stopping.`);
        break;
      }
      console.log(`  Found ${feed.items.length} items`);
      allItems.push(...feed.items);
    } catch (error: any) {
      if (error.message && error.message.includes('404')) {
        console.log(`Page ${page} not found, stopping.`);
        break;
      }
      throw error;
    }
  }

  return allItems;
}

async function main() {
  console.log('Starting RSS migration...\n');
  console.log(`RSS URL: ${RSS_URL}`);
  console.log(`Content dir: ${CONTENT_DIR}`);
  console.log(`Public blog dir: ${PUBLIC_BLOG_DIR}`);
  
  await ensureDir(CONTENT_DIR);
  await ensureDir(PUBLIC_BLOG_DIR);
  await ensureDir(PEOPLE_DIR);
  
  const items = await fetchAllItems();
  
  console.log(`\nTotal items to process: ${items.length}`);
  
  for (const item of items) {
    await processItem(item);
  }
  
  console.log('\nMigration complete!');
}

main().catch(console.error);
