import axios from "axios";

const API_BASE_URL1 = "http://localhost:5001";
const API_BASE_URL2 = "http://localhost:5002";
const API_BASE_URL3 = "http://localhost:5003";
const API_BASE_URL4 = "http://localhost:5004";
const API_BASE_URL5 = "http://localhost:5005";

// Auth endpoints
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL2}/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const changePassword = (data) =>
  axios.post(`${API_BASE_URL2}/change-password`, data);
export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL2}/forgot-password`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// User endpoints
export const registerEmployee = (data) =>
  axios.post(`${API_BASE_URL2}/register/employee`, data);
export const registerDriver = (data) =>
  axios.post(`${API_BASE_URL2}/register/driver`, data);
export const registerAdmin = (data) =>
  axios.post(`${API_BASE_URL2}/register/admin`, data);
export const getUser = (id, token) =>
  axios.get(`${API_BASE_URL2}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateUser = (id, data, token) =>
  axios.put(`${API_BASE_URL2}/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteUser = (id, token) =>
  axios.delete(`${API_BASE_URL2}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Booking endpoints
export const createBooking = async (bookingData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL1}/booking`,
      bookingData,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateBooking = (id, data, token) =>
  axios.put(`${API_BASE_URL1}/booking/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getBooking = (id, token) =>
  axios.get(`${API_BASE_URL1}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteBooking = (id, token) =>
  axios.delete(`${API_BASE_URL1}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getBookingsForEmployee = (employeeId, token) =>
  axios.get(`${API_BASE_URL1}/bookings/employee/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Driver Availability endpoints
export const createAvailability = (data, token) =>
  axios.post(`${API_BASE_URL3}/availability`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateAvailability = (id, data, token) =>
  axios.put(`${API_BASE_URL3}/availability/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getAvailability = (id, token) =>
  axios.get(`${API_BASE_URL3}/availability/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteAvailability = (id, token) =>
  axios.delete(`${API_BASE_URL3}/availability/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getAvailabilitiesByDriver = (driverId, token) =>
  axios.get(`${API_BASE_URL3}/availabilities/driver/${driverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getPickupsByDriver = (driverId, token) =>
  axios.get(`${API_BASE_URL3}/pickups/driver/${driverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Route endpoints
export const createRoute = (data, token) =>
  axios.post(`${API_BASE_URL4}/route`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateRoute = (id, data, token) =>
  axios.put(`${API_BASE_URL4}/route/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getRoute = (id, token) =>
  axios.get(`${API_BASE_URL4}/route/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteRoute = (id, token) =>
  axios.delete(`${API_BASE_URL4}/route/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getRoutes = (token) =>
  axios.get(`${API_BASE_URL4}/routes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Admin management endpoints
export const getEmployees = (token) =>
  axios.get(`${API_BASE_URL5}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getDrivers = (token) =>
  axios.get(`${API_BASE_URL5}/drivers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getAdmins = (token) =>
  axios.get(`${API_BASE_URL5}/admins`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateBookingStatus = (bookingId, data, token) =>
  axios.put(`${API_BASE_URL5}/admin/update-booking/${bookingId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateDriverAvailability = (availabilityId, data, token) =>
  axios.put(
    `${API_BASE_URL5}/admin/update-availability/${availabilityId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const reallocateCabs = (token) =>
  axios.post(`${API_BASE_URL5}/admin/reallocate-cabs`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
