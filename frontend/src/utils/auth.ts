import { apiCall } from "../services/api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  token?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

const CURRENT_USER_KEY = "currentUser";
const TOKEN_KEY = "token";

// ================= USER =================

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; error: string | null }> => {
  try {
    const data = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user: User = {
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || 'user',
      token: data.token,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, user.token || '');
    return { user, error: null };
  } catch (err: any) {
    return { user: null as any, error: err.message || 'Login failed' };
  }
};

export const register = async (
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<{ user: User; error: string | null }> => {
  try {
    const data = await apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password }),
    });

    const user: User = {
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || 'user',
      token: data.token,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, user.token || '');
    return { user, error: null };
  } catch (err: any) {
    return { user: null as any, error: err.message || 'Registration failed' };
  }
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const authHeader = (): { [key: string]: string } => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
