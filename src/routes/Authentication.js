import express from 'express';
import { createAgent, loginAgent } from '../controllers/AgentAuthentication';
import {
  agentProperties, allProperties, createProperty,
  deleteProperty, editProperty, getPropertyById
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput, validateUserInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const indexRouter = express.Router();

indexRouter.post('/signup', validateUserInput, createAgent);
indexRouter.post('/login', loginAgent);
indexRouter.get('/properties', allProperties);
indexRouter.get('/property/:id', getPropertyById);
indexRouter.post('/post-property', verifyToken, validatePropertyInput, createProperty);
indexRouter.get('/post-property/:id', verifyToken, agentProperties);
indexRouter.put('/property/:id', verifyToken, editProperty, createAgent);
indexRouter.delete('/property/:id', verifyToken, deleteProperty);

export default indexRouter;
