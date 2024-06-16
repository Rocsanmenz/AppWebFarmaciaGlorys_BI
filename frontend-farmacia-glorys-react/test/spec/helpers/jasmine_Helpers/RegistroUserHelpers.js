let registeredUser = [];

function registerUser(name, email, phoneNumber, password) {
    const existingUser = registeredUser.find(User => User.email === email);
    if (existingUser) {
        return { success: false, message: "El User ya está registrado." };
    }

    if (!isPasswordValid(password)) {
        return { success: false, message: "La contraseña no cumple con los requisitos mínimos." };
    }

    registeredUser.push({ name, email, phoneNumber, password });
    return { success: true, message: "User registrado exitosamente." };
}

function getAllUser() {
    return registeredUser;
}

function getUserByEmail(email) {
    return registeredUser.find(User => User.email === email);
}

function isPasswordValid(password) {
    // Validación básica de contraseña: al menos 8 caracteres
    return password.length >= 8;
}

module.exports = {
    registerUser,
    getAllUser,
    getUserByEmail
};
