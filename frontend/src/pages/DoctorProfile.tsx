import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, Award, Clock, Calendar, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setDoctor(null);
      return;
    }

    fetch(`/api/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((data) => setDoctor(data))
      .catch(() => setDoctor(null));
  }, [id]);

  if (doctor === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (doctor === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/doctors')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Doctors
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="relative h-80">
                <img 
                  src={doctor.image || 'https://images.unsplash.com/photo-1612349317453-3ad32c4a0e7f?w=400&h=400&fit=crop'} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{doctor.rating || '4.8'}</span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-blue-600 font-medium mb-4">{doctor.specialty}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Award className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{doctor.experience || 0} years experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span>₹{doctor.consultationFee || 'N/A'} per consultation</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span>MediCare Hospital</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{doctor.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">{doctor.email || doctor.name.toLowerCase().replace(/ /g, '.')}@medicare.com</span>
                  </div>
                </div>

                <Link
                  to={`/book-appointment/${doctor.id || doctor._id}`}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-center font-semibold"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about || `Experienced ${doctor.specialty || 'healthcare'} specialist with ${doctor.experience || 'extensive'} years of practice. Dedicated to providing high-quality patient care and treatment.`}</p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <p className="text-gray-600">{doctor.qualification || 'Medical Degree'}</p>
              </div>
            </div>

            {/* Availability */}
            {(doctor.availableDays || doctor.availableSlots) && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Availability</h2>
                
                {doctor.availableDays && doctor.availableDays.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Available Days
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableDays.map((day: string) => (
                        <span
                          key={day}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {doctor.availableSlots && doctor.availableSlots.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {doctor.availableSlots.map((slot: string) => (
                        <span
                          key={slot}
                          className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium text-center"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specializations */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Specialization</h2>
              <p className="text-lg">{doctor.specialty}</p>
              <p className="mt-4 opacity-90">
                Expert in diagnosing and treating conditions related to {doctor.specialty.toLowerCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
