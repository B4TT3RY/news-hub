import * as yonhapNews from './yonhapnews.js';
import * as ytn from './ytn.js';
import * as sbsnews from './sbsnews.js';

export const cache = [];

export const initializeCache = async () => {
  cache.push(...(await yonhapNews.getNews()));
  cache.push(...(await ytn.getNews()));
  cache.push(...(await sbsnews.getNews()));
  cache.sort((a, b) => b.pubDate - a.pubDate);
};

export const updateCache = async () => {
  const previousCache = Array.from(cache);

  const news = [
    ...(await yonhapNews.getNews()),
    ...(await ytn.getNews()),
    ...(await sbsnews.getNews()),
  ];
  const diff = findDiff(previousCache, news);

  cache.push(...diff);
  cache.sort((a, b) => b.pubDate - a.pubDate);

  return diff;
};

function findDiff(a, b) {
  const existingLinks = new Set(a.map((item) => item.link));
  const diff = b.filter((item) => !existingLinks.has(item.link));
  return diff;
}
