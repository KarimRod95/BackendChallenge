import express from 'express';
import ProductManager from '../desafio1.js';

const app = express();
const productManager = new ProductManager();

app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductByID(pid);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.get('/products', (req, res) => {
  const { limit } = req.query;

  if (limit) {
    const limitedProducts = productManager.getProducts().slice(0, parseInt(limit));
    res.json({ products: limitedProducts });
  } else {
    res.json({ products: productManager.getProducts() });
  }
});

app.listen(8080, () => {
  console.log('Listening...');
});