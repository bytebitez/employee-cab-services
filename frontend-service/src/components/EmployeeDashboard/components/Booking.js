import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    destination: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic
  };

  const currentTime = new Date().getHours();
  const canBook = currentTime < 8; // Check if current time is before 8 AM

  // Function to disable dates in the calendar
  const disableDates = ({ date, view }) => {
    // Disable previous dates and today if after 8 AM
    if (view === "month" && !canBook) {
      const today = new Date();
      today.setHours(8, 0, 0, 0); // Set time to 8 AM today
      return date <= today;
    }
    return false;
  };

  return (
    <div className="container mt-4">
      <h2>Book Your Trip</h2>

      <div className="row mt-4">
        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Select Date in Calendar</h5>
            <Calendar
              onChange={(date) => setFormData({ ...formData, date })}
              value={formData.date}
              minDate={new Date()}
              tileDisabled={disableDates}
              className="w-100" // Make calendar full width on small screens
            />
          </div>
          <div className="col-md-6"></div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 mt-4 mt-md-0">
            {" "}
            {/* Added mt-4 for spacing */}
            {canBook ? (
              <Form onSubmit={handleSubmit} className="w-100">
                {" "}
                {/* Make form full width on small screens */}
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
                <Button variant="primary" type="submit" className="w-100">
                  Book
                </Button>
              </Form>
            ) : (
              <p className="mt-3">
                <b>Note: </b> Booking is closed for today. Please try before 8
                AM.
              </p>
            )}
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
