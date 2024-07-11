import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Availability from "./components/Availability";
import TripHistory from "./components/TripHistory";
import Help from "./components/Help";
import { AuthContext } from "../../contexts/AuthContext";
import "./Styles/DriverDashboard.css";

const DriverDashboard = () => {
  const { auth, handleLogout } = useContext(AuthContext);

  return (
    <Container fluid>
      <Row>
        <Col
          md={12}
          style={{ background: "linear-gradient(to right, #fe4fcf, #00f2fe)" }}
          className="header m-0"
        >
          <Navbar expand="lg" variant="dark">
            <Navbar.Brand href="#home">Driver Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="ml-auto align-items-center">
                <NavDropdown
                  title={
                    <Image
                      src="no-profile.jpg"
                      roundedCircle
                      width="30"
                      height="30"
                    />
                  }
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item disabled>
                    Hello, {auth.user["first_name"]}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col
          md={2}
          className="sidebar"
          style={{ background: "linear-gradient(to right, #fe4fcf, #00f2fe)" }}
        >
          <Nav className="flex-column">
            <NavLink
              to="/driver-dashboard"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/driver-dashboard/availability"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Availability
            </NavLink>
            <NavLink
              to="/driver-dashboard/history"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Trip History
            </NavLink>
            <NavLink
              to="/driver-dashboard/help"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Help
            </NavLink>
          </Nav>
        </Col>
        <Col md={10} className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="availability" element={<Availability />} />
            <Route path="history" element={<TripHistory />} />
            <Route path="help" element={<Help />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverDashboard;
