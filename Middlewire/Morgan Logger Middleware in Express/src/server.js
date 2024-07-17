const express = require('express')

const morgan = require('morgan')

const fs = require('fs')

const path = require('path')

const app = express()
const port = 3000;


app.use(express.json())


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url', { stream: accessLogStream }))


app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Express Server!')
});

app.get('/get-users', (req, res) => {
  
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ]
    res.status(200).json(users);
})

app.post('/add-user', (req, res) => {
    res.status(201).send('User added successfully!')
})

app.put('/user/:id', (req, res) => {
    res.status(201).send(`User with ID ${req.params.id} updated successfully!`)
})

app.delete('/user/:id', (req, res) => {
    res.send(`User with ID ${req.params.id} deleted successfully!`)
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
