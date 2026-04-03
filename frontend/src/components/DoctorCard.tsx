import { Link } from 'react-router';
import { Star, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';
import type { Doctor } from '../data/doctors';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{doctor.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Award className="w-4 h-4 mr-2" />
            <span>{doctor.experience} years experience</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>₹{doctor.consultationFee} consultation fee</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
          >
            View Profile
          </Link>
          <Link
            to={`/book-appointment/${doctor.id}`}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-center font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
