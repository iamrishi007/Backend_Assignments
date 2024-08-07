const express = require('express');
const Product = require('../product');
const router = express.Router();


router.post('/', async (req, res) => {
    const { name, price, description, category } = req.body;

    try {
        const product = new Product({ name, price, description, category });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, { name, price, description, category }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
