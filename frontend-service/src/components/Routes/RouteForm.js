import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { createRoute } from '../../services/api';

const RouteForm = () => {
    const [formData, setFormData] = useState({ startLocation: '', endLocation: '', routeDetails: '' });
    const { auth } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createRoute(formData, auth.token);
        // Handle success or error
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formStartLocation">
                    <Form.Label>Start Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="startLocation"
                        value={formData.startLocation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEndLocation">
                    <Form.Label>End Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="endLocation"
                        value={formData.endLocation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formRouteDetails">
                    <Form.Label>Route Details</Form.Label>
                    <Form.Control
                        type="text"
                        name="routeDetails"
                        value={formData.routeDetails}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Route
                </Button>
            </Form>
        </Container>
    );
};

export default RouteForm;
