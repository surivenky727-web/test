import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Clock, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import { authHeader } from '../utils/auth';

interface Appointment {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/doctor/appointments', {
        headers: authHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (appointmentId: string) => {
    setUpdatingId(appointmentId);
    try {
      const response = await fetch(
        `/api/doctor/appointments/${appointmentId}/complete`,
        {
          method: 'PATCH',
          headers: authHeader(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      // Update local state
      setAppointments(
        appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: 'completed' } : apt
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update appointment');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments =
    filterStatus === 'all'
      ? appointments
      : appointments.filter((apt) => apt.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold">Your Appointments</h1>
          <p className="text-gray-600">Manage your patient appointments</p>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600"
        >
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex gap-2 flex-wrap"
      >
        {(['all', 'upcoming', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === status
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center"
        >
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No appointments found</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
          className="space-y-4"
        >
          {filteredAppointments.map((appointment, idx) => (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Appointment Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">{appointment.patientName}</h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{appointment.time}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{appointment.patientEmail}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{appointment.patientPhone}</span>
                      </div>

                      {appointment.reason && (
                        <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                          <p className="text-sm font-medium text-gray-600 mb-1">Reason:</p>
                          <p className="text-gray-700">{appointment.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-center gap-4">
                    <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${
                      appointment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : appointment.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </div>

                    {appointment.status === 'upcoming' && (
                      <button
                        onClick={() => handleMarkComplete(appointment._id)}
                        disabled={updatingId === appointment._id}
                        className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold transition-colors"
                      >
                        {updatingId === appointment._id
                          ? 'Updating...'
                          : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
