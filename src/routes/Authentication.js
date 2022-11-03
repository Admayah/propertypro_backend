import express from 'express';
import { createAgent, editAgentInfo, getAgents, loginAgent, singleAgent } from '../controllers/AgentAuthentication';
import uploadPropertyImage from '../controllers/imageController';
import { verifyToken } from '../middleware/auth';
import { validateUserInput } from '../middleware/middleware';

const indexRouter = express.Router();

indexRouter.post('/signup', validateUserInput, createAgent);


indexRouter.post('/login', loginAgent);

indexRouter.get('/agents', getAgents);

indexRouter.put('/agent/edit', verifyToken, editAgentInfo)

indexRouter.get('/agent', verifyToken, singleAgent)

indexRouter.post('/upload', uploadPropertyImage)

export default indexRouter;
