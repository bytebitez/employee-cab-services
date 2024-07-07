import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import { login } from '../../services/api';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
    const { setAuth } = useContext(AuthContext);
    const showAlert = useContext(AlertContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            setAuth({ user: response.data.user, token: response.data.token });
            navigate('/employee-dashboard'); // or navigate to the appropriate dashboard based on role
        } catch (error) {
            showAlert(error.response?.data?.message || 'Login failed', 'danger');
        }
    };

    return (
        <div className="login-bg">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={6} lg={5} xl={4}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Login</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formPhoneNumber" className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter phone number"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="btn-lg">
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
