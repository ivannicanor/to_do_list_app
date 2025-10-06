// controllers/authController.js
const bcrypt = require('bcrypt');//hashea las contraseñas
const jwt = require('jsonwebtoken');
const { User } = require('../models');


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
        const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
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
  //POST /auth/login
  exports.login = async (req, res) => {
      try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }

          // Payload del token
          const payload = {
          sub: user.id,          // subject: identificador único
          role: user.rol // sirve para autorización user vs admin.
          };

          // Firmar el token usando jwt.sign
          const token = jwt.sign(
          payload,                           // datos (claims)
          process.env.JWT_SECRET,            // clave secreta
          { expiresIn: process.env.JWT_EXPIRES_IN }  // tiempo de expiración
          );

          return res.json({
        message: "Login exitoso",
        user: { id: user.id},
        token,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el login', error: error.message });
    }
  };





   