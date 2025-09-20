const pool = require('../../config/db');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.userId]);
    res.json({ success: true, tasks: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add task
exports.addTask = async (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !priority) {
    return res.status(400).json({ success: false, message: 'Title and priority required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status, priority) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, title, description || '', 'pending', priority]
    );
    res.json({ success: true, taskId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE tasks SET title=?, description=?, priority=?, status=? WHERE id=? AND user_id=?',
      [title, description, priority, status, id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Task not found or not yours' });
    }

    res.json({ success: true, message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id=? AND user_id=?',
      [id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Task not found or not yours' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
