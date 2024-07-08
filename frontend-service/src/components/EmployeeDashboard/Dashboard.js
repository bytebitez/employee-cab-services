import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Calendar from 'react-calendar'; // You need to install react-calendar

const Dashboard = () => {
    const currentWeekBookings = [
        // Dummy data, replace with actual booking data
        { date: '2024-07-01', time: '09:00 AM', destination: 'Office' },
        { date: '2024-07-02', time: '09:00 AM', destination: 'Office' },
    ];

    return (
        <div>
            <h2>Current Week Bookings</h2>
            <Card>
                <ListGroup variant="flush">
                    {currentWeekBookings.map((booking, index) => (
                        <ListGroup.Item key={index}>
                            {booking.date} - {booking.time} - {booking.destination}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <h2 className="mt-4">Work Week Calendar</h2>
            <Calendar />
        </div>
    );
};

export default Dashboard;
