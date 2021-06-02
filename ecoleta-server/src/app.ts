import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { errors } from 'celebrate';

import { routes } from './routes';

config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(
  '/pointsImage',
  express.static(path.resolve(__dirname, '..', 'pointsImage'))
);

app.use(errors());
