const User = require('../models/user');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Count doctors from Doctor collection only (authoritative source)
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const upcomingAppointments = await Appointment.countDocuments({
      status: 'upcoming',
    });
    const completedAppointments = await Appointment.countDocuments({
      status: 'completed',
    });

    res.json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      upcomingAppointments,
      completedAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Users Management
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort('-createdAt');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User promoted to admin', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Appointments Management
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort('-createdAt');
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!['upcoming', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctors Management
const createDoctor = async (req, res) => {
  const {
    name,
    specialty,
    experience,
    qualification,
    image,
    rating,
    consultationFee,
    about,
    availableDays,
    availableSlots,
  } = req.body;

  if (!name || !specialty || !consultationFee) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const doctor = await Doctor.create({
      name,
      specialty,
      experience: experience || 0,
      qualification: qualification || '',
      image: image || '',
      rating: rating || 4.5,
      consultationFee,
      about: about || '',
      availableDays: availableDays || [],
      availableSlots: availableSlots || [],
    });

    const obj = doctor.toObject();
    obj.id = obj._id.toString();
    res.status(201).json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const obj = doctor.toObject();
    obj.id = obj._id.toString();
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    // Try to find a User with this id
    const user = await User.findById(id);

    if (user && user.role === 'doctor') {
      // if user has a linked doctor profile, delete it and related appointments
      const docId = user.doctorProfile;
      if (docId) {
        await Appointment.deleteMany({ $or: [{ doctorId: docId }, { doctorId: user._id }] });
        await Doctor.findByIdAndDelete(docId);
      } else {
        // remove appointments that may reference the user id directly
        await Appointment.deleteMany({ doctorId: user._id });
      }

      await User.findByIdAndDelete(user._id);
      return res.json({ message: 'Doctor (user + profile) deleted successfully' });
    }

    // If not a user, try Doctor collection
    const doctor = await Doctor.findById(id);
    if (doctor) {
      // if doctor has linked user, delete user as well
      if (doctor.userId) {
        await Appointment.deleteMany({ $or: [{ doctorId: doctor._id }, { doctorId: doctor.userId }] });
        await User.findByIdAndDelete(doctor.userId);
      } else {
        await Appointment.deleteMany({ doctorId: doctor._id });
      }

      await Doctor.findByIdAndDelete(doctor._id);
      return res.json({ message: 'Doctor (profile + linked user) deleted successfully' });
    }

    return res.status(404).json({ message: 'Doctor not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  makeAdmin,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
