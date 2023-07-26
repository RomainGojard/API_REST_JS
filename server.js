require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
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
mongoose.connect( process.env.mongodbConnection , { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  authSource: 'admin' 
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
 
 const swaggerDocs = swaggerJsDoc(swaggerOptions);


// Middleware for parsing request body
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.use('/users', userRoutes);

app.use('/pokemons', pokemonRoutes);

app.use('/trainers', trainerRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oups ! We got a problem.');
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

