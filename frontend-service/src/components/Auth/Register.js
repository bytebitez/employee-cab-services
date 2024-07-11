import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { registerEmployee, registerDriver, registerAdmin } from '../../services/api';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        role: 'employee',
    });
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const registerFunc =
            formData.role === 'employee'
                ? registerEmployee
                : formData.role === 'driver'
                ? registerDriver
                : registerAdmin;
    
        try {
            await registerFunc(formData);
            
            navigate('/login');
    
        } catch (error) {
            setAlert({ type: 'danger', message: error.response.data.message });
            setTimeout(() => setAlert(null), 5000);
        }
    };

    return (
        <div className="register-bg">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={6} lg={5} xl={4}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Register</h2>
                                {alert && (
                                    <Alert variant={alert.type}>
                                        {alert.message}
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formFirstName" className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter first name"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formLastName" className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter last name"
                                        />
                                    </Form.Group>

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

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter email"
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

                                    <Form.Group controlId="formRole" className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control as="select" name="role" value={formData.role} onChange={handleChange}>
                                            <option value="employee">Employee</option>
                                            <option value="driver">Driver</option>
                                            <option value="admin">Admin</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="btn-lg btn-block">
                                        Register
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

export default Register;
