import * as yonhapNews from './yonhapnews.js';
import * as ytn from './ytn.js';

export let cache = [];

export const initializeCache = async () => {
  cache.push(...(await yonhapNews.getNews()));
  cache.push(...(await ytn.getNews()));
  cache.sort((a, b) => b.pubDate - a.pubDate);
};

export const updateCache = async () => {
  const previousCache = Array.from(cache);

  const news = [...(await yonhapNews.getNews()), ...(await ytn.getNews())];
  const diff = findDiff(previousCache, news);

  cache.push(...diff);
  cache.sort((a, b) => b.pubDate - a.pubDate);

  return diff;
};

function findDiff(a, b) {
  const existingLinks = new Set(a.map(item => item.link));
  const diff = b.filter(item => !existingLinks.has(item.link));
  return diff;
}
