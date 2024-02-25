import express from 'express';
import cors from 'cors';

import { storageRouter } from './routes/storage.route.js';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/storage', storageRouter);

server.listen(8080, () => {
    console.log('Server listening ...');
})