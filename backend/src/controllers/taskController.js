const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }, // optional: order newest first
    });
    res.json({ success: true, tasks });
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
    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        priority,
        status: 'pending',
        userId: req.user.userId,
      },
    });
    res.json({ success: true, taskId: task.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  try {
    // Update task only if it belongs to the user
    const task = await prisma.task.updateMany({
      where: { id: parseInt(id), userId: req.user.userId },
      data: { title, description, priority, status },
    });

    if (task.count === 0) {
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
    // Delete task only if it belongs to the user
    const task = await prisma.task.deleteMany({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (task.count === 0) {
      return res.status(404).json({ success: false, message: 'Task not found or not yours' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
