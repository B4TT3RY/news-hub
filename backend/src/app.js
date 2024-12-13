import express from 'express';
import { startCron } from './cron.js';
import cors from 'cors';

const app = express();
export const clients = new Set();

app.use(express.json());
app.use(cors());

app.get('/events', (req, res) => {
  try {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    res.flushHeaders();

    res.write(`data: ${JSON.stringify({ message: 'Connected' })}\n\n`);

    clients.add(res);

    req.on('close', () => {
      clients.delete(res);
    });
  } catch (e) {
    console.error('SSE Error:' + e);
    res.status(500).end();
  }
});

export async function broadcastMessage(data) {
  const promises = Array.from(clients).map((client) => {
    return new Promise((resolve, reject) => {
      client.write(`data: ${JSON.stringify(data)}\n\n`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Error sending events:', error);
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end();
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startCron();
});
