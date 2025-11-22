const express = require('express');
const router = express.Router();
const assignmentsController = require('../controllers/assignmentsController');

// Show all assignments
router.get('/', assignmentsController.getAllAssignments);

// Show form to add new assignment
router.get('/add', assignmentsController.getAddForm);

// Create new assignment
router.post('/add', assignmentsController.createAssignment);

// Show edit form
router.get('/edit/:id', assignmentsController.getEditForm);

// Update assignment
router.put('/edit/:id', assignmentsController.updateAssignment);

// Delete assignment
router.delete('/delete/:id', assignmentsController.deleteAssignment);

module.exports = router;
