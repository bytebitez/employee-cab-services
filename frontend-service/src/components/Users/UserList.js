import React, { useState, useEffect, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { getEmployees } from '../../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getEmployees(auth.token);
            setUsers(response.data);
        };

        fetchUsers();
    }, [auth]);

    return (
        <Container>
            <h2>User List</h2>
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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserList;
