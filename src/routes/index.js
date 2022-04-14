import express from 'express';
import { createAgent, logAgent } from '../controlllers/AgentSignup';
import { validateUserInput } from '../middleware';

const indexRouter = express.Router();

indexRouter.post('/signup', validateUserInput, createAgent);
indexRouter.post('/login', logAgent);

export default indexRouter;
