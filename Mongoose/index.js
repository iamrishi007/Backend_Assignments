const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost:27017/userProductDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
