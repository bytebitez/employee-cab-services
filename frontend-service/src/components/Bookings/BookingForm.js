import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { createBooking } from '../../services/api';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        time: ''
    });
    const { auth } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBooking(formData, auth.token);
            // Handle successful booking creation
        } catch (error) {
            // Handle error
        }
    };

    return (
        <Container>
            <h2>Book a Cab</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPickupLocation">
                    <Form.Label>Pickup Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDropoffLocation">
                    <Form.Label>Dropoff Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Book
                </Button>
            </Form>
        </Container>
    );
};

export default BookingForm;
