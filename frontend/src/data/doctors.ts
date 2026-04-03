export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  qualification: string;
  image: string;
  rating: number;
  consultationFee: number;
  about: string;
  availableDays: string[];
  availableSlots: string[];
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 15,
    qualification: "MD, DM (Cardiology), MBBS",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.8,
    consultationFee: 500,
    about: "Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience in treating heart diseases. She specializes in interventional cardiology and has performed over 5000 successful procedures.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgeon",
    experience: 12,
    qualification: "MS (Ortho), MBBS",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 4.9,
    consultationFee: 600,
    about: "Dr. Michael Chen is an expert orthopedic surgeon specializing in sports injuries and joint replacement surgeries. He has helped thousands of patients regain their mobility.",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: 10,
    qualification: "MD (Pediatrics), MBBS",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    rating: 4.7,
    consultationFee: 400,
    about: "Dr. Emily Rodriguez is a caring pediatrician with a decade of experience in child healthcare. She is known for her gentle approach and expertise in pediatric immunology.",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"]
  },
  {
    id: "4",
    name: "Dr. James Williams",
    specialty: "Neurologist",
    experience: 18,
    qualification: "DM (Neurology), MD, MBBS",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    rating: 4.9,
    consultationFee: 700,
    about: "Dr. James Williams is a highly experienced neurologist specializing in stroke management, epilepsy, and neurodegenerative disorders. His research has been published in leading medical journals.",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: 8,
    qualification: "MD (Dermatology), MBBS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 4.6,
    consultationFee: 450,
    about: "Dr. Priya Sharma is a skilled dermatologist offering treatments for skin, hair, and nail conditions. She specializes in cosmetic dermatology and laser treatments.",
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]
  },
  {
    id: "6",
    name: "Dr. Robert Martinez",
    specialty: "General Physician",
    experience: 20,
    qualification: "MD (Medicine), MBBS",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    rating: 4.8,
    consultationFee: 350,
    about: "Dr. Robert Martinez is a veteran general physician with two decades of experience. He provides comprehensive healthcare services and preventive medicine consultations.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]
  }
];

export const specialties = [
  "All Specialties",
  "Cardiologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Neurologist",
  "Dermatologist",
  "General Physician"
];
