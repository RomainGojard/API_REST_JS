require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
       openapi: '3.0.0',
       info: {
          title: 'My API',
          version: '1.0.0',
       },
    },
    apis: ['./routes/*.js'],
 };

//connect to mongodb
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
 
 const swaggerDocs = swaggerJsDoc(swaggerOptions);


//middleware to parse json and urlencoded request body
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.use('/user', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oups ! We got a problem.');
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

