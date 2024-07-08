import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Booking = () => {
    const [formData, setFormData] = useState({ date: '', time: '', destination: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking logic
    };

    const currentTime = new Date().getHours();
    const canBook = currentTime < 8;

    return (
        <div>
            <h2>Book Your Trip</h2>
            {canBook ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDate" className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formTime" className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formDestination" className="mb-3">
                        <Form.Label>Destination</Form.Label>
                        <Form.Control type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Book</Button>
                </Form>
            ) : (
                <p>Booking is closed for today. Please try before 8 AM.</p>
            )}
        </div>
    );
};

export default Booking;
