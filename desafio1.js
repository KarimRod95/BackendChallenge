const fs = require('fs');

const path = './productsDB.json';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = path;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar el archivo', error);
        }
    }

    productID = () => {
        const count = this.products.length;
        if (count === 0) return 1;

        const lastProduct = this.products[count - 1];

        return lastProduct.id + 1;
    }

    addProduct = ({ title, description, price, thumbnail, code, stock }) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) return;
        if (this.products.some(product => product.code === code)) return;

        const id = this.productID();

        this.products.push({
            id,
            title,
            description,
            code,
            price,
            thumbnail,
            stock
        });

        this.saveProducts();
    }

    updateProduct = (id, updatedFields) => {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        } else {
            console.error('Producto no encontrado');
        }
    }

    deleteProduct = (id) => {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1); // Elimina el producto del arreglo
            this.saveProducts();
        } else {
            console.error('Producto no encontrado');
        }
    }

    saveProducts() {
        const productsJSON = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsJSON, 'utf-8');
        console.log('Productos guardados en ' + this.path);
    }

    getProductByID = (code) => {
        const product = this.products.find(p => p.code === code);

        if (product) return product;
        else console.error('No encontrado');
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: 'Beers',
    description: 'Brahma',
    price: 5,
    thumbnail: 'https://tinyurl.com/brahmabeer',
    code: '1001',
    stock: 100
});

productManager.addProduct({
    title: 'Chips',
    description: 'Lays',
    price: 2,
    thumbnail: 'https://tinyurl.com/layspack',
    code: '1004',
    stock: 100
})

productManager.addProduct({
    title: 'Soda',
    description: 'Coca-Cola',
    price: 3,
    thumbnail: 'https://tinyurl.com/coquitachica',
    code: '1002',
    stock: 100
})

productManager.addProduct({
    title: 'Wine',
    description: 'Luigi Bosca',
    price: 8,
    thumbnail: 'https://tinyurl.com/nothswine',
    code: '1003',
    stock: 100
})

productManager.updateProduct(4, {
    title: 'Updated Wine',
    description: 'Updated Luigi Bosca',
    price: 12,
    thumbnail: 'https://tiniyurl.com/nothswine',
    stock: 300
})

productManager.updateProduct(3, {
    title: 'Updated Soda',
    description: 'Updated Coca-Cola',
    price: 5,
    thumbnail: 'https://tiniyurl.com/coquitachica',
    stock: 200
})


productManager.updateProduct(2, {
    title: 'Updated Chips',
    description: 'Updated Lays',
    price: 3,
    thumbnail: 'https://tinyurl.com/layspack',
    stock: 200
})

productManager.updateProduct(1, {
    title: 'Updated Beers',
    description: 'Updated Brahma',
    price: 6,
    thumbnail: 'https://tinyurl.com/brahmabeer',
    stock: 200
});

// Eliminar un producto por su ID
productManager.deleteProduct(1);

console.log(productManager);
