import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { AlertCircle, ArrowLeft, Mail, Phone, Briefcase, BookOpen, MapPin, DollarSign } from 'lucide-react';
import { authHeader, getCurrentUser } from '../utils/auth';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  qualification: string;
  consultationFee: number;
  about?: string;
  image?: string;
}

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'doctor') {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/doctor/profile', {
        headers: authHeader(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setDoctor(data);
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

  if (!doctor) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Unable to load your profile</p>
        </div>
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
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <p className="text-gray-600">View your professional information</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{doctor.name}</h2>
              <p className="text-green-100">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{doctor.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{doctor.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Briefcase className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Specialty</p>
                  <p className="font-semibold text-gray-900">{doctor.specialty}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BookOpen className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Qualification</p>
                  <p className="font-semibold text-gray-900">{doctor.qualification || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold text-gray-900">{doctor.experience} years</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <DollarSign className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Consultation Fee</p>
                  <p className="font-semibold text-gray-900">₹{doctor.consultationFee}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          {doctor.about && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">About</h3>
              <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
            </div>
          )}

          {/* Edit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              disabled
              className="w-full px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed"
            >
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
