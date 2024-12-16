import cron from 'node-cron';
import { ticker } from './ticker.js';
import * as scrapers from './scrapers/index.js';

export const startCron = () => {
  console.log('Cron started');
  cron.schedule('0 * * * * *', async () => {
    if (ticker.activeSessions.length === 0 && scrapers.cache.length !== 0) {
      scrapers.cache.splice(0, scrapers.cache.length);
    }

    if (ticker.activeSessions.length === 0) return;

    const diff = await scrapers.updateCache();
    if (diff.length === 0) {
      return;
    }
    console.log(`[${new Date().toISOString()}] Find ${diff.length} new news, broadcasting...`)
    ticker.broadcast(diff);
  });
};
