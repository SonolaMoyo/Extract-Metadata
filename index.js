import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import {router} from './routers/main.router.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const errorMiddleware = (error, req, res) => {
  return res
    .status(500)
    .json({ status: 'failed', msg: 'Error found in this route', err: error });
};
app.use(errorMiddleware);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`app listen on port localhost:${PORT}`);
});
