import logger from 'morgan';
import express from 'express';
import cors from 'cors'
import fileUpload from 'express-fileupload';
const cloudinary = require('cloudinary').v2

import cookieParser from 'cookie-parser';
import indexRouter from './routes/Authentication';
import propertyRouter from './routes/propertyRoutes';

const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const corsOptions ={
  origin: process.env.ORIGIN_URL, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
app.use('/v1', indexRouter);
app.use('/v1', propertyRouter);

const options = {
  swaggerDefinition: {
    info: {
      title: 'Propertypro',
      description: 'Users can post, edit and delete properties as an agent.',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
});
app.use('/propertypro', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
