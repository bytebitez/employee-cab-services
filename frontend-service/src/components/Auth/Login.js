import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import { login } from '../../services/api';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ phone_number: '', password: '' });
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
            const user = response.data.user;
            setAuth({ user: response.data.user, token: response.data.token });

            // Navigate to the appropriate dashboard based on the user's role
            if (user.role === 'employee') {
                navigate('/employee-dashboard');
            } else if (user.role === 'driver') {
                navigate('/driver-dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/'); // Default fallback
            }

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
                                            name="phone_number"
                                            value={formData.phone_number}
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

                                    <Button variant="primary" type="submit" className="btn-lg btn-block">
                                        Login
                                    </Button>
                                </Form>

                                <div className="mt-3 text-center">
                                    <Link to="/forgot-password" className="d-block mb-2">
                                        Forgot Password?
                                    </Link>
                                    <Link to="/register" className="d-block">
                                        Don't have an account? Register
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
