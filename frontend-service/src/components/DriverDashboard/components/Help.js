import React from "react";
import { Card } from "react-bootstrap";
import "./../Styles/Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <Card className="help-card">
        <Card.Body>
          <Card.Title><h2>Contact Us</h2></Card.Title>
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
