const CustomerService = require('../../lib/jasmine_examples/RegistroUser');

describe('CustomerService', function() {
    let customerService;

    beforeEach(function() {
        customerService = new CustomerService();
    });

    it('should register a customer with valid name, email, and password', function() {
        const result = customerService.registerCustomer('John Doe', 'john.doe@example.com', 'securepassword');
        expect(result).toBe(true);
        expect(customerService.customers.length).toBe(1);
        expect(customerService.customers[0].name).toBe('John Doe');
        expect(customerService.customers[0].email).toBe('john.doe@example.com');
        expect(customerService.customers[0].password).toBe('securepassword');
    });

    it('should not register a customer with invalid email', function() {
        const result = customerService.registerCustomer('Jane Doe', 'invalid-email', 'securepassword');
        expect(result).toBe(false);
        expect(customerService.customers.length).toBe(0);
    });

    it('should not register a customer with an email that is already registered', function() {
        customerService.registerCustomer('John Doe', 'john.doe@example.com', 'securepassword');
        const result = customerService.registerCustomer('Jane Doe', 'john.doe@example.com', 'anotherpassword');
        expect(result).toBe(false);
        expect(customerService.customers.length).toBe(1);
    });

    it('should not register a customer with an invalid password', function() {
        const result = customerService.registerCustomer('John Doe', 'john.doe@example.com', '123');
        expect(result).toBe(false);
        expect(customerService.customers.length).toBe(0);
    });

    it('should validate email correctly', function() {
        expect(customerService.isEmailValid('valid.email@example.com')).toBe(true);
        expect(customerService.isEmailValid('invalid-email')).toBe(false);
    });

    it('should validate password correctly', function() {
        expect(customerService.isPasswordValid('validpassword')).toBe(true);
        expect(customerService.isPasswordValid('123')).toBe(false);
    });

    it('should check if email is already registered', function() {
        customerService.registerCustomer('John Doe', 'john.doe@example.com', 'securepassword');
        expect(customerService.isEmailRegistered('john.doe@example.com')).toBe(true);
        expect(customerService.isEmailRegistered('jane.doe@example.com')).toBe(false);
    });
});
