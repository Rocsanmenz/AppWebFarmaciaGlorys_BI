// spec/jasmine_Spec/ProductServiceSpec.js

const ProductService = require('../../lib/jasmine_examples/ProductService');

describe('ProductService', function() {
    let productService;

    beforeEach(function() {
        productService = new ProductService();
    });

    it('should register a product with valid details', function() {
        const result = productService.registerProduct('Product A', 100, 150, 10, 'Brand X', 'Category Y', 'Presentation Z');
        expect(result).toBe(true);
        expect(productService.products.length).toBe(1);
        expect(productService.products[0].nombreProducto).toBe('Product A');
        expect(productService.products[0].precioCompra).toBe(100);
        expect(productService.products[0].precioVenta).toBe(150);
        expect(productService.products[0].stock).toBe(10);
        expect(productService.products[0].marca).toBe('Brand X');
        expect(productService.products[0].categoria).toBe('Category Y');
        expect(productService.products[0].presentacion).toBe('Presentation Z');
    });

    it('should not register a product with invalid details', function() {
        const result = productService.registerProduct('', 100, 150, 10, 'Brand X', 'Category Y', 'Presentation Z');
        expect(result).toBe(false);
        expect(productService.products.length).toBe(0);
    });

    it('should not register a product with negative price or stock', function() {
        let result = productService.registerProduct('Product B', -100, 150, 10, 'Brand X', 'Category Y', 'Presentation Z');
        expect(result).toBe(false);
        expect(productService.products.length).toBe(0);

        result = productService.registerProduct('Product C', 100, -150, 10, 'Brand X', 'Category Y', 'Presentation Z');
        expect(result).toBe(false);
        expect(productService.products.length).toBe(0);

        result = productService.registerProduct('Product D', 100, 150, -10, 'Brand X', 'Category Y', 'Presentation Z');
        expect(result).toBe(false);
        expect(productService.products.length).toBe(0);
    });

    it('should validate product details correctly', function() {
        expect(productService.isProductValid('Product A', -100, 150, 10, 'Brand X', 'Category Y', 'Presentation Z')).toBe(false);
        expect(productService.isProductValid('Product A', 100, -150, 10, 'Brand X', 'Category Y', 'Presentation Z')).toBe(false);
        expect(productService.isProductValid('Product A', 100, 150, -10, 'Brand X', 'Category Y', 'Presentation Z')).toBe(false);
    });
});
