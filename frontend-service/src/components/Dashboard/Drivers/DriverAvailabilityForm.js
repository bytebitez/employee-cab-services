import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { createAvailability } from '../../services/api';

const DriverAvailabilityForm = () => {
    const [formData, setFormData] = useState({ date: '', availability: '' });
    const { auth } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAvailability(formData, auth.token);
        // Handle success or error
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
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

                <Form.Group controlId="formAvailability">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Set Availability
                </Button>
            </Form>
        </Container>
    );
};

export default DriverAvailabilityForm;
