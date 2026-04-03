const express = require('express');
const { createAppointment, getAppointments, updateAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all appointments (dashboard uses filtering client-side)
router.get('/', protect, getAppointments);

// protected create
router.post('/', protect, createAppointment);

// update status/fields
router.patch('/:id', protect, updateAppointment);

module.exports = router;