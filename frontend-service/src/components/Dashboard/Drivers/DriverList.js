import React, { useState, useEffect, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { getDrivers } from '../../services/api';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await getDrivers(auth.token);
            setDrivers(response.data);
        };

        fetchDrivers();
    }, [auth]);

    return (
        <Container>
            <h2>Driver List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.firstName} {driver.lastName}</td>
                            <td>{driver.phoneNumber}</td>
                            <td>{driver.email}</td>
                            <td>{driver.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DriverList;
