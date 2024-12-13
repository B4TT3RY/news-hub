import cron from 'node-cron';
import { ticker } from './ticker.js';

export const startCron = () => {
  console.log('Cron started');
  cron.schedule('*/1 * * * * *', async () => {
    if (ticker.activeSessions.length > 0) {
      const data = {
        timestamp: new Date(),
        text: `${Math.random()}`,
        id: new Date(),
      };

      ticker.broadcast(data);
    }
  });
};
