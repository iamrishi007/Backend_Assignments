const express = require("express")

const fs = require("fs")

const server = express()
server.use(express.json())

const PORT = 3000;


const readData = () => {
    const data = fs.readFileSync("db.json", "utf-8")
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2))
};


server.get("/todos", (req, res) => {
    const data = readData()
    res.json(data.todos)
});

// Add a new todo
server.post("/todos", (req, res) => {
    const data = readData()
    const newTodo = {
        id: data.todos.length + 1,
        title: req.body.title,
        status: false,
    };
    data.todos.push(newTodo)
    writeData(data);
    res.status(201).json(newTodo)
});


server.put("/todos/status", (req, res) => {
    const data = readData()
    data.todos.forEach(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            todo.status = true
        }
    })

    writeData(data);
    res.json({ message: "Status of even ID todos updated" });
});


server.delete("/todos", (req, res) => {
    let data = readData();
    const initialLength = data.todos.length;
    data.todos = data.todos.filter(todo => todo.status === false)
    writeData(data);
    const deletedCount = initialLength - data.todos.length
    res.json({ message: `Deleted ${deletedCount} todos` })
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
