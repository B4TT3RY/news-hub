import * as yonhapNews from './yonhapnews.js';

export const cache = [];

export const initializeCache = async () => {
  cache.push(...(await yonhapNews.getNews()));
  cache.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const updateCache = async () => {
  const previousCache = Array.from(cache);

  const news = [...(await yonhapNews.getNews())];

  const diff = findDiff(previousCache, news);

  cache.push(...diff);
  cache.sort((a, b) => new Date(b.date) - new Date(a.date));

  return diff;
};

function findDiff(a, b) {
  const existingLinks = new Set(a.map(item => item.link));
  const diff = b.filter(item => !existingLinks.has(item.link));
  return diff;
}
