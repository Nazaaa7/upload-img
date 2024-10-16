import { v4 as uuidv4 } from 'uuid';

const products = [];

export const createProduct = (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price: parseFloat(price),
        imageUrl
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
};

export const getProducts = (req, res) => {
    res.json(products);
};