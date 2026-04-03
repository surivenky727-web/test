import { authHeader } from "../utils/auth";
import { apiCall } from "./api";

export interface AppointmentInput {
  doctorId: string;
  date: string;
  time: string;
}

export const bookAppointment = async (data: AppointmentInput) => {
  return apiCall('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getMyAppointments = async () => {
  try {
    return await apiCall('/api/appointments');
  } catch {
    return [];
  }
};

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
};
export interface User {
  name: string;
  email: string;
}