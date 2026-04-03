import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import DoctorCard from "../components/DoctorCard";
import { getDoctors } from "../services/doctorService";

export default function Doctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([
    "All Specialties",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState("All Specialties");

  useEffect(() => {
    getDoctors()
      .then((data) => {
        setDoctors(data || []);

        const sp = Array.from(
          new Set([
            "All Specialties",
            ...(data || []).map((d) => d.specialty),
          ])
        );

        setSpecialties(sp);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setDoctors([]);
      });
  }, []);

  // ✅ FILTER LOGIC
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor?.specialty
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor?.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Doctor
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Browse our network of expert healthcare professionals
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors cursor-pointer"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredDoctors.length}
            </span>{" "}
            doctor{filteredDoctors.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}