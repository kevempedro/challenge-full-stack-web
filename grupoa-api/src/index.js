import express from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import './database';
import routes from './routes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(helmet());

app.use(cors());

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
