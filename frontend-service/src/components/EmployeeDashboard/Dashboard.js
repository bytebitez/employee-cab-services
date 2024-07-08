import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar'; // You need to install react-calendar
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
    const currentWeekBookings = [
        // Dummy data, replace with actual booking data
        { date: '2024-07-01', time: '09:00 AM', destination: 'Office' },
        { date: '2024-07-02', time: '09:00 AM', destination: 'Office' },
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Current Week Bookings</h2>
            <Row>
                <Col md={6}>
                    <Card>
                        <ListGroup variant="flush">
                            {currentWeekBookings.map((booking, index) => (
                                <ListGroup.Item key={index}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div>{booking.date}</div>
                                            <div>{booking.time}</div>
                                        </div>
                                        <div className="text-muted">{booking.destination}</div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h5 className="mb-3">Work Week Calendar</h5>
                            <Calendar />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
