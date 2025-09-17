// controllers/authController.js
const bcrypt = require('bcrypt');//hashea las contraseñas
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const {
    JWT_SECRET,
    JWT_EXPIRES_IN = '15m',
    JWT_ISSUER,//es una forma para validar que el token venga de nuestra app
    JWT_AUDIENCE,//es una forma para validar que el token venga de nuestra app
    BCRYPT_SALT_ROUNDS = 10,//tipo de encriptado
} = process.env;

// POST /auth/register

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // comprobar si el email ya existe
        const exists = await User.findOne({ where: { email: email.toLowerCase() } });
        if (exists) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        // generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS));

        // crear usuario
        const user = await User.create({
            email: email.toLowerCase(),
            password: passwordHash,
            username: username || null,
        });

        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el register', error: error.message });
    }
}