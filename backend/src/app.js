import express from 'express';
import { startCron } from './cron.js';
import cors from 'cors';
import { createSession } from "better-sse";
import { ticker } from "./ticker.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/sse', async (req, res) => {
  const session = await createSession(req, res);
  session.push("Connected", "ping");
  ticker.register(session);
  
  session.on('disconnect', () => {
    ticker.unregister(session);
    console.log('Disconnected');
  });
});

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
