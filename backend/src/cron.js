import cron from 'node-cron';
import { clients, broadcastMessage } from './app.js';

export const startCron = () => {
  console.log('Cron started');
  cron.schedule('*/2 * * * * *', async () => {
    console.log(clients.size);
    if (clients.size > 0) {
      const data = {
        timestamp: new Date(),
        text: `${Math.random()}`,
        id: new Date(),
      };

      await broadcastMessage(data);
    }
  });
};
