import express from 'express';
import { createAgent, loginAgent } from '../controllers/AgentAuthentication';
import { validateUserInput } from '../middleware/middleware';

const indexRouter = express.Router();

/**
 * @swagger
 * definitions:
 *  Register:
 *    properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      phoneNo:
 *        type: string
 *    example: {
 *          "firstName": Seun,
 *          "lastName": Kayode,
 *          "email": seun123@gmail.com,
 *          "password": Kayode123,
 *          "phoneNo": 0908723451
 *      }
 */
/**
 * @swagger
 * definitions:
 *  Login:
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *    example: {
 *          "email": seun123@gmail.com,
 *          "password": Kayode123,
 *      }
 */

/**
 * @swagger
 * /v1/signup:
 *    post:
 *     tags:
 *       - Users & Authentication
 *     description: Register/Signs up a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *        201:
 *          description: Successfully created
 *          example: {
 *             "firstName": "Seun",
 *             "lastName": Kayode,
 *             "email": seun123@gmail.com,
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJjdXJyZW50VXNlciI6eyJpc0Jhbm
 *5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c
 *2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWls
 *LmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zx
 *qKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *        }
 *        400:
 *          description: Bad Username, Password or Email
 *        500:
 *          description:  Internal server error
 */
indexRouter.post('/signup', validateUserInput, createAgent);

/**
 * @swagger
 * /v1/login:
 *    post:
 *     tags:
 *       - Users & Authentication
 *     description: Login a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *        201:
 *          description: Successfully created
 *          example: {
 *             "email": seun123@gmail.com,
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJjdXJyZW50VXNlciI6eyJpc0Jhbm
 *5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c
 *2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWls
 *LmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zx
 *qKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *        }
 *        400:
 *          description: Bad Username, Password or Email
 *        500:
 *          description:  Internal server error
 */
indexRouter.post('/login', loginAgent);

export default indexRouter;
