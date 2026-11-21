import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import registerRoutes from './routes.js';

const api = express();
api.use(cors());
api.use(express.json());
registerRoutes(api);

const port = process.env.PORT
api.listen(port,() => console.log("API listening on port " + port))