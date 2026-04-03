import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BarChart3, Users, FileText, Calendar } from 'lucide-react';
import { getCurrentUser, authHeader } from '../utils/auth';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadStats();
  }, [user, navigate]);

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: authHeader(),
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const cards = [
    {
      icon: Users,
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      color: 'blue',
      route: '/admin/users',
    },
    {
      icon: FileText,
      label: 'Total Doctors',
      value: stats?.totalDoctors || 0,
      color: 'green',
      route: '/admin/doctors',
    },
    {
      icon: Calendar,
      label: 'Total Appointments',
      value: stats?.totalAppointments || 0,
      color: 'purple',
      route: '/admin/appointments',
    },
    {
      icon: Calendar,
      label: 'Upcoming Appointments',
      value: stats?.upcomingAppointments || 0,
      color: 'orange',
      route: '/admin/appointments',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-600">Manage users, doctors, and appointments</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(card.route)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg bg-${card.color}-100 flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                <p className="text-gray-600 text-sm mb-2">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" />
            Management Panels
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors"
            >
              <h3 className="font-semibold mb-1">Manage Users</h3>
              <p className="text-sm opacity-90">View and manage all users</p>
            </button>
            <button
              onClick={() => navigate('/admin/doctors')}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors"
            >
              <h3 className="font-semibold mb-1">Manage Doctors</h3>
              <p className="text-sm opacity-90">Add, edit, or remove doctors</p>
            </button>
            <button
              onClick={() => navigate('/admin/appointments')}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors"
            >
              <h3 className="font-semibold mb-1">Manage Appointments</h3>
              <p className="text-sm opacity-90">View all appointments</p>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition-colors"
            >
              <h3 className="font-semibold mb-1">Refresh Stats</h3>
              <p className="text-sm opacity-90">Update dashboard data</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
