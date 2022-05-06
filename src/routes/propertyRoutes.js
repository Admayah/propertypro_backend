import express from 'express';
import {
  getAgentProperties, getAllProperties, createProperty,
  deleteProperty, editProperty, getPropertyById
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const propertyRouter = express.Router();

propertyRouter.get('/properties', getAllProperties);
propertyRouter.get('/property/:id', getPropertyById);
propertyRouter.post('/agent/property', verifyToken, validatePropertyInput, createProperty);
propertyRouter.get('/agent/property/:id', verifyToken, getAgentProperties);
propertyRouter.put('/property/:id', verifyToken, editProperty);
propertyRouter.delete('/property/:id', verifyToken, deleteProperty);

export default propertyRouter;
