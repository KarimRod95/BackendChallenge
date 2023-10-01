class ProductManager {

    constructor(){
        this.products = []
    }

    productID = () => {
        const count = this.products.length
        if(count === 0) return 1

        const lastProduct = this.products[count-1]

        return lastProduct.id + 1
    }

    addProduct = ({title, description, price, thumbnail, code, stock}) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) return // Valida que los campos sean obligatorios
        if (this.products.some(product => product.code === code)) return //Valida que el campo code no se repita

        const id = this.productID()

        this.products.push({
            id,
            title,
            description,
            code,
            price,
            thumbnail,
            stock
        })
    }

    getProductByID = (code) => {
        const product = this.products.find(p => p.code === code)

        if(product) return product
        else console.error('Not Found')
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: 'Beers',
    description: 'Brahma',
    price: 5,
    thumbnail: 'https://tinyurl.com/brahmabeer',
    code: '1001',
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
    description: 'Noths',
    price: 8,
    thumbnail: 'https://tinyurl.com/nothswine',
    code: '1003',
    stock: 100
})
productManager.addProduct({
    title: 'Chips',
    description: 'Lays',
    price: 2,
    thumbnail: 'https://tinyurl.com/layspack',
    code: '1004',
    stock: 100
})

productManager.getProductByID('1001')

console.log(productManager);