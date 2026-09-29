const db = require('../db');

async function createUsuario(req, res) {
  const { usu_usuario, usu_nombre, usu_apellido } = req.body;
  if (!usu_usuario || !usu_nombre || !usu_apellido) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const [result] = await db.execute(
      'INSERT INTO usuarios (usu_usuario, usu_nombre, usu_apellido) VALUES (?, ?, ?)',
      [usu_usuario, usu_nombre, usu_apellido]
    );
    const newId = result.insertId;
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE usu_id = ?', [newId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

async function getAllUsuarios(req, res) {
  try {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE usu_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

async function updateUsuario(req, res) {
  const { id } = req.params;
  const { usu_usuario, usu_nombre, usu_apellido } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE usuarios SET usu_usuario = ?, usu_nombre = ?, usu_apellido = ? WHERE usu_id = ?',
      [usu_usuario, usu_nombre, usu_apellido, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE usu_id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM usuarios WHERE usu_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
