import express from 'express';
import {
  getAgentProperties, getAllProperties, createProperty,
  deleteProperty, editProperty, getPropertyById, singleProperty, getAgentProperty
} from '../controllers/propertyInfo/propertyController';
import { validatePropertyInput } from '../middleware/middleware';
import { verifyToken } from '../middleware/auth';

const propertyRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Property:
 *     properties:
 *       image:
 *         type: integer
 *       title:
 *         type: string
 *       address:
 *         type: string
 *       landArea:
 *         type: string
 *       noOfRoom:
 *         type: string
 *       noOfBath:
 *         type: string
 *       noOfGarage:
 *         type: string
 *       noOfStore:
 *         type: string
 *       yearBuild:
 *         type: string
 *       purpose:
 *         type: string
 *     example: {
 *       image: duplex.png,
 *       title: two duplex flat,
 *       address: 21, Isolo street,
 *       landArea: 3,
 *       noOfRoom: 5,
 *       noOfBath: 3,
 *       noOfGarage: 1,
 *       noOfStore: 2,
 *       yearBuild: 2012,
 *       purpose: rent
 *     }
 */

/**
 * @swagger
 * definitions:
 *    GetProperty:
 *     properties:
 *       propertyId:
 *         type: integer
 *     example: {
 *      propertyId: 13
 *      }
 */

/**
 * @swagger
 * /v1/properties:
 *   get:
 *      tags:
 *        - Property information
 *      description: Retrieve all properties added to the database
 *      produces:
 *        - application/json
 *      parameters:
 *          schema:
 *            $ref: '#/definitions/Property'
 *            type: object
 *      responses:
 *        200:
 *          description: Property modified successfully
 *          example: {
 *           "property": {
 *              "id": 20,
 *              "image_url": "flat.png",
 *              "title": "2 bedroom flat",
 *              "address": "20, Ijegun Road",
 *              "land_area": 200sq/meter,
 *              "no_of_rooms": 3,
 *              "no_of_bedrooms": 4,
 *              "no_of_garage": 1,
 *              "no_of_store": 1,
 *              "year_of_build": 2012,
 *              "purpose": "sale"
 *           }
 *          }
 */

propertyRouter.get('/properties', getAllProperties);

/**
 * @swagger
 * /v1/properties/{id}:
 *   get:
 *      tags:
 *        - Property information
 *      description: Retrieve an already added property information by id
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: ID of the property
 *          in: path
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Property modified successfully
 *          example: {
 *           "property": {
 *              "id": 20,
 *              "image_url": "flat.png",
 *              "title": "2 bedroom flat",
 *              "address": "20, Ijegun Road",
 *              "land_area": 200sq/meter,
 *              "no_of_rooms": 3,
 *              "no_of_bedrooms": 4,
 *              "no_of_garage": 1,
 *              "no_of_store": 1,
 *              "year_of_build": 2012,
 *              "purpose": "sale"
 *           }
 *          }
 */

propertyRouter.get('/properties/:id', getPropertyById);

/**
 * @swagger
 * /v1/agent/properties:
 *   post:
 *     tags:
 *       - Property information
 *     description: Adds a property to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: propertyInfo
 *         description: Property object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Property'
 *       - name: Authorization
 *         in: header
 *         description: an authentication header
 *         type: string
 *     responses:
 *       201:
 *         description: Property uploaded successfully
 *         example: {
 *               "message": "Book uploaded successfully",
 *               "data": {
 *               "id": 11,
 *               image: duplex.png,
 *               title: two duplex flat,
 *               address: 21, Isolo street,
 *               landArea: 3,
 *               noOfRoom: 5,
 *               noOfBath: 3,
 *               noOfGarage: 1,
 *               noOfStore: 2,
 *               yearBuild: 2012,
 *               purpose: rent,
 *               "updatedAt": "2018-01-05T16:07:09.885Z",
 *               "createdAt": "2018-01-05T16:07:09.885Z"
 *    }
 *  }
 *       400:
 *         description: Bad input supplied
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */

propertyRouter.post('/agent/properties', verifyToken,  createProperty);

/**
 * @swagger
 * /v1/agent/properties:
 *   get:
 *      tags:
 *        -  Property information
 *      description: Retrieve an already added property information of a specific agent by id
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          description: an authentication header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          example: {
 *           "success": true,
 *           "property": {
 *              "id": 20,
 *              "image_url": "flat.png",
 *              "title": "2 bedroom flat",
 *              "address": "20, Ijegun Road",
 *              "land_area": 200sq/meter,
 *              "no_of_rooms": 3,
 *              "no_of_bedrooms": 4,
 *              "no_of_garage": 1,
 *              "no_of_store": 1,
 *              "year_of_build": 2012,
 *              "purpose": "sale"
 *           }
 *          }
 *      404:
 *        description: Property not found
 *      500:
 *        description: Internal server error
 */

propertyRouter.get('/agent/properties', verifyToken, getAgentProperties);

propertyRouter.get('/agent/properties/:id', verifyToken, singleProperty );

propertyRouter.get('/agent/property/:id', verifyToken, getAgentProperty );



/**
 * @swagger
 * /v1/agent/properties/{id}:
 *   put:
 *      tags:
 *        - Property information
 *      description: Modify an already added property information
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: ID of the property
 *          in: path
 *          required: true
 *          type: integer
 *        - name: property
 *          description: Property object with updated information
 *          in: body
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Property'
 *            type: object
 *            required:
 *              - propertyId
 *            properties:
 *              propertyId:
 *                type: integer
 *            example: {
 *                propertyId: 10
 *            }
 *        - name: Authorization
 *          in: header
 *          description: an authentication header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Property modified successfully
 *          example: {
 *           "property": {
 *              "id": 20,
 *              "image_url": "flat.png",
 *              "title": "2 bedroom flat",
 *              "address": "20, Ijegun Road",
 *              "land_area": 200sq/meter,
 *              "no_of_rooms": 3,
 *              "no_of_bedrooms": 4,
 *              "no_of_garage": 1,
 *              "no_of_store": 1,
 *              "year_of_build": 2012,
 *              "purpose": "sale"
 *           },
 *            "message": "Property updated successfully!"
 *       }
 *        400:
 *         description: All field are required
 *        401:
 *         description: Invalid token supplied
 *        404:
 *         description: Property not found
 *        500:
 *         description: Internal server error
 */

propertyRouter.put('/agent/properties/:id', verifyToken, editProperty);

/**
 * @swagger
 * /v1/agent/properties/{id}:
 *   delete:
 *      tags:
 *        - Property information
 *      description: Delete already added property from database
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: ID of the property to be deleted
 *          in: path
 *          required: true
 *          type: integer
 *          schema:
 *            $ref: '#/definitions/GetProperty'
 *            type: object
 *            required:
 *              - propertyId
 *            properties:
 *              propertyId:
 *                type: integer
 *            example: {
 *                success: true,
 *                propertyId: 10
 *            }
 *        - name: Authorization
 *          in: header
 *          description: an authentication header
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Property successfully deleted
 *          example: {
 *              "id": 20,
 *              "message": "Property deleted successfully!",
 *       }
 *        400:
 *          description: invalid inputs!
 *        401:
 *          description: Invalid token supplied
 *        404:
 *          description: Property not found
 *        500:
 *          description: Internal server error
 */

propertyRouter.delete('/agent/properties/:id', verifyToken, deleteProperty);

export default propertyRouter;
