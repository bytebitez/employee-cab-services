import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../contexts/AlertContext';
import { forgotPassword } from '../../services/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const showAlert = useContext(AlertContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({email});
            showAlert('A temporary password has been sent. Please check your email.', 'success');
            navigate('/login');
        } catch (error) {
            showAlert(error.response?.data?.message || 'Failed to send reset password', 'danger');
        }
    };

    return (
        <div className="forgot-password-bg">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={6} lg={5} xl={4}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Forgot Password</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="btn-lg btn-block">
                                        Send Reset Password
                                    </Button>
                                </Form>

                                <div className="mt-3 text-center">
                                    <Button variant="link" onClick={() => navigate('/login')}>
                                        Back to Login
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;
