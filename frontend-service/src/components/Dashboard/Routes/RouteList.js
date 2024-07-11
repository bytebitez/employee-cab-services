import React, { useState, useEffect, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';
import { getRoutes } from '../../../services/api';

const RouteList = () => {
    const [routes, setRoutes] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchRoutes = async () => {
            const response = await getRoutes(auth.token);
            setRoutes(response.data);
        };

        fetchRoutes();
    }, [auth]);

    return (
        <Container>
            <h2>Route List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start Location</th>
                        <th>End Location</th>
                        <th>Route Details</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route) => (
                        <tr key={route.id}>
                            <td>{route.id}</td>
                            <td>{route.startLocation}</td>
                            <td>{route.endLocation}</td>
                            <td>{route.routeDetails}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default RouteList;
