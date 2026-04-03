const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  makeAdmin,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDashboardStats,
} = require('../controllers/adminController');

const router = express.Router();

// all admin routes are protected
router.use(protect);
router.use(adminOnly);

// dashboard
router.get('/stats', getDashboardStats);

// users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/make-admin', makeAdmin);

// appointments
router.get('/appointments', getAllAppointments);
router.patch('/appointments/:id/status', updateAppointmentStatus);
router.delete('/appointments/:id', deleteAppointment);

// doctors
router.post('/doctors', createDoctor);
router.patch('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

module.exports = router;
