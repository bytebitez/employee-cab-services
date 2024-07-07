import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Auth endpoints
export const login = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const changePassword = (data) => axios.post(`${API_BASE_URL}/change-password`, data);
export const forgotPassword = (data) => axios.post(`${API_BASE_URL}/forgot-password`, data);

// User endpoints
export const registerEmployee = (data) => axios.post(`${API_BASE_URL}/register/employee`, data);
export const registerDriver = (data) => axios.post(`${API_BASE_URL}/register/driver`, data);
export const registerAdmin = (data) => axios.post(`${API_BASE_URL}/register/admin`, data);
export const getUser = (id, token) => axios.get(`${API_BASE_URL}/user/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateUser = (id, data, token) => axios.put(`${API_BASE_URL}/user/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteUser = (id, token) => axios.delete(`${API_BASE_URL}/user/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Booking endpoints
export const createBooking = (data, token) => axios.post(`${API_BASE_URL}/booking`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateBooking = (id, data, token) => axios.put(`${API_BASE_URL}/booking/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getBooking = (id, token) => axios.get(`${API_BASE_URL}/booking/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteBooking = (id, token) => axios.delete(`${API_BASE_URL}/booking/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getBookingsForEmployee = (employeeId, token) => axios.get(`${API_BASE_URL}/bookings/employee/${employeeId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Driver Availability endpoints
export const createAvailability = (data, token) => axios.post(`${API_BASE_URL}/availability`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateAvailability = (id, data, token) => axios.put(`${API_BASE_URL}/availability/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getAvailability = (id, token) => axios.get(`${API_BASE_URL}/availability/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteAvailability = (id, token) => axios.delete(`${API_BASE_URL}/availability/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getAvailabilitiesByDriver = (driverId, token) => axios.get(`${API_BASE_URL}/availabilities/driver/${driverId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getPickupsByDriver = (driverId, token) => axios.get(`${API_BASE_URL}/pickups/driver/${driverId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Route endpoints
export const createRoute = (data, token) => axios.post(`${API_BASE_URL}/route`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateRoute = (id, data, token) => axios.put(`${API_BASE_URL}/route/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getRoute = (id, token) => axios.get(`${API_BASE_URL}/route/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteRoute = (id, token) => axios.delete(`${API_BASE_URL}/route/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getRoutes = (token) => axios.get(`${API_BASE_URL}/routes`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Admin management endpoints
export const getEmployees = (token) => axios.get(`${API_BASE_URL}/employees`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getDrivers = (token) => axios.get(`${API_BASE_URL}/drivers`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getAdmins = (token) => axios.get(`${API_BASE_URL}/admins`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateBookingStatus = (bookingId, data, token) => axios.put(`${API_BASE_URL}/admin/update-booking/${bookingId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateDriverAvailability = (availabilityId, data, token) => axios.put(`${API_BASE_URL}/admin/update-availability/${availabilityId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const reallocateCabs = (token) => axios.post(`${API_BASE_URL}/admin/reallocate-cabs`, null, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
