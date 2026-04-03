const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const User = require('../models/user');

// create a new appointment (protected)
const createAppointment = async (req, res) => {
  const { doctorId, date, slot, contact } = req.body;

  if (!doctorId || !date || !slot) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Prefer Doctor profile documents (authoritative)
    let doctor = await Doctor.findById(doctorId);

    // If not found as a Doctor profile, it might be a User id referencing a doctor; try to resolve
    if (!doctor) {
      const user = await User.findById(doctorId);
      if (user && user.doctorProfile) {
        doctor = await Doctor.findById(user.doctorProfile);
      }
    }

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newAppointment = await Appointment.create({
      doctorId: doctor._id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time: slot,
      status: 'upcoming',
      patientName: req.user ? req.user.name : req.body.patientName,
      patientEmail: req.user ? req.user.email : (req.body.patientEmail || contact),
      patientPhone: req.user ? req.user.phone : contact,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get appointments for the logged in user
const getAppointments = async (req, res) => {
  try {
    // if protect ran, req.user should be populated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const appointments = await Appointment.find({
      $or: [
        { patientEmail: req.user.email },
        { patientPhone: req.user.phone },
        { patientName: req.user.name },
      ],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// update appointment status
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status) appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
};