import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import UserRouter from './users/router';


const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => res.send('Sever is running... resources are available.'));
server.use('/api/users', UserRouter);

server.use('/*', (req, res, next) => {
  return res.status(404).json({ error: 'Unknown endpoint.' })
});

export default server;
