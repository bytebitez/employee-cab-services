import React from 'react';
import { Card } from 'react-bootstrap';

const Help = () => {
    return (
        <div>
            <h2>Help & Support</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Contact Us</Card.Title>
                    <Card.Text>
                        For any assistance, please contact us at:
                        <br />
                        Email: support@example.com
                        <br />
                        Phone: +123 456 7890
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Help;
