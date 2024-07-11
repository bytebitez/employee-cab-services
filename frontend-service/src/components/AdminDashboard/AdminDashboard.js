import React from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Image,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, Route, Routes } from "react-router-dom";
import AdminDashboardMain from "./AdminDashboardMain";
import EmployeeList from "./EmployeeList";
import DriverList from "./DriverList";
import RouteList from "./RouteList";
import "./AdminDashboard.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AdminDashboard = () => {
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
            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
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
              to="/admin-dashboard"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin-dashboard/employees"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Employees
            </NavLink>
            <NavLink
              to="/admin-dashboard/drivers"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Drivers
            </NavLink>
            <NavLink
              to="/admin-dashboard/routes"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Routes
            </NavLink>
          </Nav>
        </Col>
        <Col md={10} className="content">
          <Routes>
            <Route path="/" element={<AdminDashboardMain />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="drivers" element={<DriverList />} />
            <Route path="routes" element={<RouteList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
