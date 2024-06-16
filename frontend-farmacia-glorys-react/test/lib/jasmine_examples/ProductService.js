// lib/jasmine_examples/ProductService.js

class ProductService {
    constructor() {
        this.products = [];
    }

    registerProduct(nombreProducto, precioCompra, precioVenta, stock, marca, categoria, presentacion) {
        if (this.isProductValid(nombreProducto, precioCompra, precioVenta, stock, marca, categoria, presentacion)) {
            const product = {
                id: this.products.length + 1,
                nombreProducto,
                precioCompra,
                precioVenta,
                stock,
                marca,
                categoria,
                presentacion
            };
            this.products.push(product);
            return true;
        }
        return false;
    }

    isProductValid(nombreProducto, precioCompra, precioVenta, stock, marca, categoria, presentacion) {
        return nombreProducto && precioCompra > 0 && precioVenta > 0 && stock >= 0 && marca && categoria && presentacion;
    }
}

module.exports = ProductService;
