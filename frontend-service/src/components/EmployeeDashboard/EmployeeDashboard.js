import React, { useContext } from 'react';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Booking from './Booking';
import TripHistory from './TripHistory';
import Help from './Help';
import { AuthContext } from '../../contexts/AuthContext'; // Assuming AuthContext provides user details and logout function
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const { auth, handleLogout } = useContext(AuthContext);

    return (
        <Container fluid>
            <Row>
                <Col md={12} className="header">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Employee Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <NavDropdown title={`Hello, ${auth.user['first_name'] + " " + auth.user['last_name']}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="sidebar">
                    <Nav className="flex-column">
                        <NavLink
                            to="/employee-dashboard"
                            end
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/employee-dashboard/booking"
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        >
                            Booking
                        </NavLink>
                        <NavLink
                            to="/employee-dashboard/history"
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        >
                            Trip History
                        </NavLink>
                        <NavLink
                            to="/employee-dashboard/help"
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                        >
                            Help
                        </NavLink>
                    </Nav>
                </Col>
                <Col md={10} className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="booking" element={<Booking />} />
                        <Route path="history" element={<TripHistory />} />
                        <Route path="help" element={<Help />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeDashboard;