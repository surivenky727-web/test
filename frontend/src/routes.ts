import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorRegister from "./pages/DoctorRegister";
import BookAppointment from "./pages/BookAppointment";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import UsersManagement from "./pages/UsersManagement";
import DoctorsManagement from "./pages/DoctorsManagement";
import AppointmentsManagement from "./pages/AppointmentsManagement";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "doctors", Component: Doctors },
      { path: "doctors/:id", Component: DoctorProfile },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "doctor-register", Component: DoctorRegister },
      {
        path: "book-appointment/:doctorId",
        Component: BookAppointment,
      },
      { path: "dashboard", Component: Dashboard },
      { path: "contact", Component: Contact },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/users", Component: UsersManagement },
      { path: "admin/doctors", Component: DoctorsManagement },
      { path: "admin/appointments", Component: AppointmentsManagement },
      { path: "doctor/dashboard", Component: DoctorDashboard },
      { path: "doctor/appointments", Component: DoctorAppointments },
      { path: "doctor/profile", Component: DoctorProfilePage },
    ],
  },
]);