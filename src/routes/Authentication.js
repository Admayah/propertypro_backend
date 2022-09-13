import express from 'express';
import { createAgent, editAgentInfo, getAgents, loginAgent, singleAgent } from '../controllers/AgentAuthentication';
import uploadPropertyImage from '../controllers/imageController';
import { validateUserInput } from '../middleware/middleware';

const indexRouter = express.Router();

indexRouter.post('/signup', validateUserInput, createAgent);


indexRouter.post('/login', loginAgent);

indexRouter.get('/agents', getAgents);

indexRouter.put('/agent/edit', editAgentInfo)

indexRouter.get('/agent/about/:id', singleAgent)

indexRouter.post('/upload', uploadPropertyImage)

export default indexRouter;
