import express from 'express';
import { createAgent, loginAgent } from '../controllers/AgentAuthentication';
import { validateUserInput } from '../middleware/middleware';

const indexRouter = express.Router();

/**
 * @swagger
 * /signup:
 *    post:
 *      summary: Adds a new User.
 *      description: Retrieve a list of users from JSONPlaceholder.
 *      responses:
 *        201:
 *          description: A list of users
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 1
 *                      first_name:
 *                        type: string
 *                        description: The user's firstName.
 *                        example: 'Seun'
 *                      last_name:
 *                        type: string
 *                        description: The user's lastName.
 *                        example: 'Kayode'
 *                      email:
 *                        type: string
 *                        description: The user's email.
 *                        example: 'Seunkayode@gmail.com'
 *                      password:
 *                        type: string
 *                        description: The user's password.
 *                        example: 'Seunkayode123'
 *                      phone_number:
 *                        type: string
 *                        description: The user's phoneNumber.
 *                        example: '0902345673'
 */

indexRouter.post('/signup', validateUserInput, createAgent);

/**
 * @swagger
 * /login:
 *    post:
 *      summary: Login in as an agent.
 *      description: Login as an agent to be able to post, edit, delete property been posted.
 *      requestBody:
 *        required: true
 *      responses:
 *        200:
 *          description: User logged in successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 1
 *                      email:
 *                        type: string
 *                        description: The user's email address.
 *                        example: 'Seunkayode@gmail.com'
 */
indexRouter.post('/login', loginAgent);

export default indexRouter;
