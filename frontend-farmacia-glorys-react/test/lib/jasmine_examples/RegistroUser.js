class CustomerService {
    constructor() {
        this.customers = [];
    }

    registerCustomer(name, email, password) {
        if (this.isEmailValid(email) && !this.isEmailRegistered(email) && this.isPasswordValid(password)) {
            const customer = { id: this.customers.length + 1, name: name, email: email, password: password };
            this.customers.push(customer);
            return true;
        }
        return false;
    }

    isEmailValid(email) {
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isEmailRegistered(email) {
        return this.customers.some(customer => customer.email === email);
    }

    isPasswordValid(password) {
        
        return password.length >= 8;
    }
}

module.exports = CustomerService;
