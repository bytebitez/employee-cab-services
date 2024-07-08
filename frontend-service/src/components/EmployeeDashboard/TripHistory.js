import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const TripHistory = () => {
    const pastTrips = [
        // Dummy data, replace with actual trip history
        { date: '2024-06-30', time: '09:00 AM', destination: 'Office' },
        { date: '2024-06-29', time: '09:00 AM', destination: 'Office' },
    ];

    return (
        <div>
            <h2>Trip History</h2>
            <Card>
                <ListGroup variant="flush">
                    {pastTrips.map((trip, index) => (
                        <ListGroup.Item key={index}>
                            {trip.date} - {trip.time} - {trip.destination}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    );
};

export default TripHistory;
