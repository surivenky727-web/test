const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getDoctorProfile,
  getDoctorAppointments,
  updateAppointmentStatus,
  getDoctorStats,
} = require('../controllers/doctorController');

const router = express.Router();

// All doctor routes are protected
router.use(protect);

// doctor stats
router.get('/stats', getDoctorStats);

// doctor profile
router.get('/profile', getDoctorProfile);

// doctor appointments
router.get('/appointments', getDoctorAppointments);

// mark appointment as completed
router.patch('/appointments/:id/complete', updateAppointmentStatus);

module.exports = router;
