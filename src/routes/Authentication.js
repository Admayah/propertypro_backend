import express from 'express';
import { createAgent, loginAgent } from '../controllers/AgentAuthentication';
import { validateUserInput } from '../middleware/middleware';

const indexRouter = express.Router();

indexRouter.post('/signup', validateUserInput, createAgent);
indexRouter.post('/login', loginAgent);

export default indexRouter;
