
-- DDL Queries

-- User Table
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('employee', 'driver', 'admin')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    state INT DEFAULT 0,  -- 0 for inactive, 1 for active
    status VARCHAR(20) CHECK (status IN ('waiting', 'booked', 'cancelled')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver Table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_location VARCHAR(100) NOT NULL,
    state INT DEFAULT 0,  -- 0 for inactive, 1 for active
    status VARCHAR(20) CHECK (status IN ('available', 'unavailable')) NOT NULL,
    cab_number VARCHAR(20) NOT NULL,
    manufacture VARCHAR(50),
    model VARCHAR(50),
    seats_available INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Booking Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
    pickup_location VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'cancelled')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Availability Table
CREATE TABLE availabilities (
    id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(id) ON DELETE CASCADE,
    start_location VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('available', 'unavailable')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Route Table
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    start_location VARCHAR(100) NOT NULL,
    end_location VARCHAR(100) NOT NULL,
    stops TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DML Queries

-- Inserting Users
INSERT INTO users (first_name, last_name, phone_number, email, password_hash, role, status)
VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', 'hashed_password', 'employee', 'active'),
('Jane', 'Smith', '0987654321', 'jane.smith@example.com', 'hashed_password', 'driver', 'active'),
('Alice', 'Brown', '5555555555', 'alice.brown@example.com', 'hashed_password', 'admin', 'active');

-- Inserting Employees
INSERT INTO employees (user_id, employee_id, pickup_location, state, status)
VALUES
(1, 'EMP001', 'Location A', 0, 'waiting');

-- Inserting Drivers
INSERT INTO drivers (user_id, start_location, state, status, cab_number, manufacture, model, seats_available)
VALUES
(2, 'Location B', 0, 'available', 'CAB1234', 'Toyota', 'Prius', 4);

-- Inserting Bookings
INSERT INTO bookings (employee_id, pickup_location, status)
VALUES
(1, 'Location A', 'pending');

-- Inserting Availabilities
INSERT INTO availabilities (driver_id, start_location, status)
VALUES
(1, 'Location B', 'available');

-- Inserting Routes
INSERT INTO routes (start_location, end_location, stops)
VALUES
('Location B', 'Location A', '["Stop1", "Stop2"]');

-- Admin Update Queries

-- Update Employee State
UPDATE employees
SET state = 1  -- Set to 1 for active
WHERE employee_id = 'EMP001';

-- Update Driver State
UPDATE drivers
SET state = 1  -- Set to 1 for active
WHERE id = 2;
