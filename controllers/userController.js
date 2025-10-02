// controllers/userController.js
const { User } = require('../models');

// ✅ Crear usuario  
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // req.body debe tener los campos del modelo
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// ✅ Obtener todos los usuarios http://localhost:3000/api/users/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    //res.json(req.user); como un /Me
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// ✅ Obtener un usuario por id http://localhost:3000/api/users/1
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// ✅ Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// ✅ Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

