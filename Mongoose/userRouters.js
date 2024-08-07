const express = require('express')
const User = require('./user')
const router = express.Router()


router.post('/', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = new User({ name, email, password })
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body

    try {
        const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router
