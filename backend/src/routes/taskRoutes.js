const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth'); // optional, for JWT

// Protect all task routes
router.use(authMiddleware);

// CRUD routes
router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
