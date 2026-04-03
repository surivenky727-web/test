import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { authHeader } from '../utils/auth';

interface DoctorStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
}

export default function DoctorDashboard() {
  const [stats, setStats] = useState<DoctorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/doctor/stats', {
        headers: authHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Upcoming',
      value: stats?.upcomingAppointments || 0,
      icon: Clock,
      color: 'from-yellow-600 to-yellow-400',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed',
      value: stats?.completedAppointments || 0,
      icon: CheckCircle,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back. Here's your overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold">{card.value}</p>
                  </div>
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${card.color}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/doctor/appointments')}
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-green-600" />
              <span className="font-semibold">View Appointments</span>
            </div>
            <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/doctor/profile')}
            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-green-600" />
              <span className="font-semibold">Edit Profile</span>
            </div>
            <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
