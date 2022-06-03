import express from 'express';
import {
  getAgentProperties, getAllProperties, createProperty,
  deleteProperty, editProperty, getPropertyById
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const propertyRouter = express.Router();


propertyRouter.get('/properties', getAllProperties);

propertyRouter.get('/properties/:id', getPropertyById);


propertyRouter.post('/agent/properties', verifyToken, validatePropertyInput, createProperty);


propertyRouter.get('/agent/properties/:id', verifyToken, getAgentProperties);


propertyRouter.put('/agent/properties/:id', verifyToken, editProperty);


propertyRouter.delete('/agent/properties/:id', verifyToken, deleteProperty);

export default propertyRouter;
