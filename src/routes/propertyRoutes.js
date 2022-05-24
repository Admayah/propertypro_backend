import express from 'express';
import {
  getAgentProperties, getAllProperties, createProperty,
  deleteProperty, editProperty, getPropertyById
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const propertyRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *      type: object
 *      properties:
 *          image_url:
 *           type: string
 *           description: The property image url.
 *           example: Leanne.jpg
 *          title:
 *           type: string
 *           description: Title of the property.
 *           example: Duplex
 *          address:
 *           type: string
 *           description: Address of property.
 *           example: Isolo. Lagos
 *          land_area:
 *           type: string
 *           description: land_area of property.
 *           example: 20
 *          no_of_rooms:
 *           type: string
 *           description: Number of rooms available in the property.
 *           example: 4
 *          no_of_beds:
 *           type: string
 *           description: Number of beds available in the property.
 *           example: 3
 *          no_of_garage:
 *           type: string
 *           description: Number of garage available in the property.
 *           example: 2
 *          no_of_stores:
 *           type: string
 *           description: Number of stores available in the property.
 *           example: 1
 *          year_of_build:
 *           type: string
 *           description: Year the property was built.
 *           example: 1
 *          purpose:
 *           type: string
 *           description: Purpose of the property. This can be either for sale or rent.
 *           example: RENT
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewUser'
 */

/**
 * @swagger
 * /agent/properties:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder properties
 *     description: Retrieve a list of properties from JSONPlaceholder.
 *                  Can be used to populate a list of fake properties when
 *                  prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/NewUser'
 */
propertyRouter.get('/properties', getAllProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Retrieve a JSONPlaceholder property.
 *     description: Retrieve a single property from the list of JSONPlaceholder properties.
 *     responses:
 *       200:
 *         description: A single property.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/NewUser'
 */
propertyRouter.get('/properties/:id', getPropertyById);

/**
 * @swagger
 * /agent/properties:
 *   post:
 *     summary: Create a property JSONPlaceholder.
 *     requestBody:
 *        required: true
 *     responses:
 *       201:
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/NewUser'
 */
propertyRouter.post('/agent/properties', verifyToken, validatePropertyInput, createProperty);

/**
 * @swagger
 * /agent/properties/{id}:
 *   get:
 *     summary: Retrieve a JSONPlaceholder property.
 *     description: Retrieve a single property from the Loggedin
 *                  agent dashboard of properties posted.
 *     responses:
 *       200:
 *         description: A single property.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/NewUser'
 */
propertyRouter.get('/agent/properties/:id', verifyToken, getAgentProperties);

/**
 * @swagger
 * /agent/properties/{id}:
 *   put:
 *     summary: Edit a property.
 *     description: Edit a single property from the  Loggedin agent dashboard of properties posted.
 *     requestBody:
 *        required: true
 *     responses:
 *       201:
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/NewUser'
 */
propertyRouter.put('/agent/properties/:id', verifyToken, editProperty);

/**
 * @swagger
 * /agent/properties/{id}:
 *   delete:
 *     summary:  Delete a property.
 *     description: Delete a single property from the  Loggedin
 *                  agent dashboard of properties posted.
 *     responses:
 *       200:
 *         description:  Property deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The property ID.
 *                         example: 0
 *                       message:
 *                         type: string
 *                         description: Property deleted from agent dashbosrd
 *                         example: Property deleted successfully
 */
propertyRouter.delete('/agent/properties/:id', verifyToken, deleteProperty);

export default propertyRouter;
