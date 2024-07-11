import React, { useState } from 'react';
import { Table, Card, Form } from 'react-bootstrap';

const TripHistory = () => {
    const [filterDate, setFilterDate] = useState('');
    const [pastTrips, setPastTrips] = useState([
        // Dummy data, replace with actual trip history
        { id: 1, date: '2024-06-30', time: '09:00 AM', destination: 'Office', purpose: 'Meeting', distance: '10 km' },
        { id: 2, date: '2024-06-29', time: '09:00 AM', destination: 'Office', purpose: 'Work', distance: '8 km' },
    ]);

    // Function to handle date filter change
    const handleDateFilterChange = (e) => {
        setFilterDate(e.target.value);
        // Implement filter logic based on date range if needed
    };

    // Example filter logic based on date range
    const filteredTrips = filterDate
        ? pastTrips.filter(trip => trip.date === filterDate)
        : pastTrips;

    return (
        <div className="container mt-4">
            <h2>Trip History</h2>
            <Card>
                <Card.Body>
                    <Form.Group controlId="formFilterDate">
                        <Form.Label>Filter by Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={filterDate}
                            onChange={handleDateFilterChange}
                        />
                    </Form.Group>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Destination</th>
                                <th>Purpose</th>
                                <th>Distance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.map((trip, index) => (
                                <tr key={trip.id}>
                                    <td>{index + 1}</td>
                                    <td>{trip.date}</td>
                                    <td>{trip.time}</td>
                                    <td>{trip.destination}</td>
                                    <td>{trip.purpose}</td>
                                    <td>{trip.distance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TripHistory;
