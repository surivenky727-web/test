import type { Doctor } from "../data/doctors";
import { apiCall } from "./api";

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    return await apiCall('/api/doctors');
  } catch {
    return [];
  }
};

export const getDoctorById = async (
  id: string
): Promise<Doctor | undefined> => {
  try {
    return await apiCall(`/api/doctors/${id}`);
  } catch {
    return undefined;
  }
};