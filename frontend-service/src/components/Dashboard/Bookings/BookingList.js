import React, { useState, useEffect, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';
import { getBookingsForEmployee } from '../../../services/api';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await getBookingsForEmployee(auth.user.id, auth.token);
            setBookings(response.data);
        };

        fetchBookings();
    }, [auth]);

    return (
        <Container>
            <h2>Your Bookings</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pickup Location</th>
                        <th>Drop Location</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.pickupLocation}</td>
                            <td>{booking.dropLocation}</td>
                            <td>{booking.date}</td>
                            <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookingList;
