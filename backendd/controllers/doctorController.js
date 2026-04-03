const Doctor = require("../models/doctor");
const User = require("../models/user");
const Appointment = require("../models/appointment");

// ✅ GET all doctors (public) - return authoritative Doctor profiles
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const cleaned = doctors.map((d) => {
      const obj = d.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    res.json(cleaned);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET single doctor (public)
const getDoctorById = async (req, res) => {
  try {
    // Prefer Doctor profile documents
    let doctor = await Doctor.findById(req.params.id);

    // If not found as a Doctor profile, it might be a User id referencing a doctor; try to resolve
    if (!doctor) {
      const user = await User.findById(req.params.id).select('-password');
      if (user && user.doctorProfile) {
        doctor = await Doctor.findById(user.doctorProfile);
      }
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const obj = doctor.toObject();
    obj.id = obj._id.toString();
    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET doctor profile (doctor specific)
const getDoctorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // get the authoritative doctor profile document
    const doctor = await Doctor.findById(user.doctorProfile);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const obj = doctor.toObject();
    obj.id = obj._id.toString();
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET doctor's appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const appointments = await Appointment.find({
      doctorId: user.doctorProfile,
    }).sort('-createdAt');

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Doctor marks appointment as completed
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // get doctor's profile id to verify authorization
    const user = await User.findById(req.user._id);
    if (!user || !user.doctorProfile) {
      return res.status(403).json({ message: 'Doctor profile not found' });
    }

    // Only the doctor can update their appointment
    if (appointment.doctorId.toString() !== user.doctorProfile.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = 'completed';
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET doctor stats
const getDoctorStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const docId = user.doctorProfile;
    const totalAppointments = await Appointment.countDocuments({
      doctorId: docId,
    });
    const upcomingAppointments = await Appointment.countDocuments({
      doctorId: docId,
      status: 'upcoming',
    });
    const completedAppointments = await Appointment.countDocuments({
      doctorId: docId,
      status: 'completed',
    });

    res.json({
      totalAppointments,
      upcomingAppointments,
      completedAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  getDoctorProfile,
  getDoctorAppointments,
  updateAppointmentStatus,
  getDoctorStats,
};