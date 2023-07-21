require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')

//routes
const userRoutes = require('./routes/userRoutes');


app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});


mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));




app.use('/user', userRoutes);
