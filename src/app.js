import express from 'express'
import ProductManager from '../desafio1.js';

const app = express()


app.get('/products/:pid', (req, res) => {
    const  productManager = new ProductManager()

    console.log(req.params);
    const {pid} = req.params
    
    res.set(`Product ID: ${pid}`)
})

app.listen(8080, () => {
    console.log('Listening...');
}) 