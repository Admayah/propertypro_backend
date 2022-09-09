import express from 'express';
import {
  getAgentProperties, getAllProperties, createProperty,
  deleteProperty, editProperty, getPropertyById, singleProperty, getAgentProperty, fetchPaginate, getPaginateProperties, helloPaginate, getAllPostedProperties, fetchPaginatedData, paginatedProperties
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const propertyRouter = express.Router();

// propertyRouter.get("/properties", getAllProperties, helloPaginate)

// propertyRouter.get('/properties', getPaginateProperties);

propertyRouter.get('/properties/:id', getPropertyById);


propertyRouter.post('/agent/properties', verifyToken,  createProperty);


propertyRouter.get('/agent/properties', verifyToken, getAgentProperties);

propertyRouter.get('/agent/properties/:id', verifyToken, singleProperty );

propertyRouter.get('/agent/property/:id', verifyToken, getAgentProperty );





propertyRouter.put('/agent/properties/:id', verifyToken, editProperty);


propertyRouter.delete('/agent/properties/:id', verifyToken, deleteProperty);

propertyRouter.get('/properties', getAllPostedProperties, fetchPaginatedData, paginatedProperties)

export default propertyRouter;
