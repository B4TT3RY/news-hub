import cron from 'node-cron';
import { ticker } from './ticker.js';
import * as scrapers from './scrapers/index.js';

export const startCron = () => {
  console.log('Cron started');
  cron.schedule('0 * * * * *', async () => {
    if (ticker.activeSessions.length === 0 && scrapers.cache.length !== 0) {
      scrapers.cache = [];
    }

    if (ticker.activeSessions.length === 0) return;

    const diff = await scrapers.updateCache();
    if (diff.length === 0) {
      console.log('No new news');
      return;
    }
    ticker.broadcast(diff);
  });
};
