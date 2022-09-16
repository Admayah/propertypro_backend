import logger from 'morgan';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
const cloudinary = require('cloudinary').v2

import cookieParser from 'cookie-parser';
import indexRouter from './routes/Authentication';
import propertyRouter from './routes/propertyRoutes';
// import { pagenateUser } from './controllers/propertyInfo/propertyController';

const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

app.use(cors({
  origin: '*'
}))

// const  whitelist  = process.env.ORIGIN_URL

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// };

// app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
app.use('/v1', indexRouter);
app.use('/v1', propertyRouter);

const users = [
  {id:1, name: "User 1"},
  {id:2, name: "User 2"},
  {id:3, name: "User 3"},
  {id:4, name: "User 4"},
  {id:5, name: "User 5"},
  {id:6, name: "User 6"},
  {id:7, name: "User 7"},
  {id:8, name: "User 8"},
  {id:9, name: "User 9"},
  {id:10, name: "User 10"},
  {id:11, name: "User 11"},
]

app.get('/v1/users', paginatedResult(users), (req, res) => {
  
  res.json(res.paginatedPages)
})

function paginatedResult(model){
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const results = {}
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit
    }
  }
  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  
  
  
  results.result = model.slice(startIndex, endIndex)
  res.paginatedPages = results
  next()
  }
}

// const userArr = [
//   {id: 1, name: "User 1"},
//   {id: 2, name: "User 2"},
//   {id: 3, name: "User 3"},
//   {id: 4, name: "User 4"},
//   {id: 5, name: "User 5"},
//   {id: 6, name: "User 6"},
//   {id: 7, name: "User 7"},
//   {id: 8, name: "User 8"},
//   {id: 9, name: "User 9"},
//   {id: 10, name: "User 10"},
//   {id: 11, name: "User 11"},
//   {id: 12, name: "User 12"},
//   {id: 13, name: "User 13"},
// ]


app.get('/userArr', (req, res) => {
  res.json(userArr)
})

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

 
// function paginate(model) {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
  
//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit
  
//     // console.log(startIndex, endIndex)
//     const result = {}
  
//     if(startIndex > 0) {
//       result.prev = {
//         page: page - 1,
//         limit: limit
//       }
//     }
  
//     if(endIndex < model.length) {
//       result.next = {
//         page: page + 1,
//         limit: limit
//       } 
//     }
  
  
//   try {
//     result.result = await model.slice().limit(limit).skip(startIndex).exec()
//     res.paginate = result

//     next()
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: error.messaage})
    
//   }
  

    
    
  
//   }
// }
export default app;
