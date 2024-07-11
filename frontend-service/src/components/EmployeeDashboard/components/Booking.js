import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createBooking } from './../../../services/api';
import { AlertContext } from '../../../contexts/AlertContext';
import { AuthContext } from '../../../contexts/AuthContext';

const Booking = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pickupLocation: '',
    dropoffLocation: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const showAlert = useContext(AlertContext);
  const { auth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        dropoff_location: formData.dropoffLocation,
        employee_id: auth.user.id,
        pickup_location: formData.pickupLocation,
        pickup_time: new Date(formData.date).toISOString().split('T')[0] + 'T' + formData.time + ':00.000Z',
      };
      await createBooking(bookingData, auth.token);
      setSuccess('Booking successful!');
      setError('');
      setFormData({
        date: '',
        time: '',
        pickupLocation: '',
        dropoffLocation: '',
      });
      showAlert("Booking successful!", "success");
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create booking');
      setSuccess('');
      showAlert(error.response?.data?.message || 'Booking failed', 'danger');
    }
  };

  const today = new Date();
  const currentTime = today.getHours();
  const canBookToday = currentTime < 8;
  const bookingEndDate = new Date();
  bookingEndDate.setDate(today.getDate() + 7);

  // Function to disable dates in the calendar
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      return date < today || date > bookingEndDate;
    }
    return false;
  };

  return (
    <div className="container mt-4">
      <h2>Book Your Trip</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="row mt-4">
        <div className="col-md-4">
          <h6>Select Date in Calendar to Book for the Day</h6>
          <Calendar
            onChange={(date) => setFormData({ ...formData, date })}
            value={formData.date}
            minDate={new Date()}
            maxDate={bookingEndDate}
            tileDisabled={disableDates}
            className="w-100"
          />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mt-4 mt-md-0">
          {(canBookToday || formData.date) ? (
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="formTime" className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPickupLocation" className="mb-3">
                <Form.Label>Pickup Location</Form.Label>
                <Form.Control
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDropoffLocation" className="mb-3">
                <Form.Label>Dropoff Location</Form.Label>
                <Form.Control
                  type="text"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Book
              </Button>
            </Form>
          ) : (
            <p className="mt-3">
              <b>Note:</b> Booking is closed for today. Please try before 8 AM.
            </p>
          )}
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default Booking;
