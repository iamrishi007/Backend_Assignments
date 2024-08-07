const express = require('express')

const app = express()

const PORT = 3000

console.log('Starting server setup...')

app.use(express.json())

console.log('Middleware setup completed.')

function validateTodoData(req, res, next) {
    console.log('Request Body:', req.body)
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    const isValid =
        typeof ID === 'number' &&
        typeof Name === 'string' &&
        typeof Rating === 'number' &&
        typeof Description === 'string' &&
        typeof Genre === 'string' &&
        Array.isArray(Cast) &&
        Cast.every(castMember => typeof castMember === 'string')

    if (!isValid) {
        console.log('Invalid data received.');
        return res.status(400).send('Bad request. Some data is incorrect.')
    }

    console.log('Valid data received.')
    res.send(ID, Name)
    next();
}

app.post('/user', validateTodoData, (req, res) => {
    console.log('POST /user endpoint hit.')
    res.status(200).send('Data received')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
