import React, { useState, useEffect } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import './Alert.css';

const Alert = ({ message, variant, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 10000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <BootstrapAlert variant={variant} onClose={onClose} dismissible>
            {message}
        </BootstrapAlert>
    );
};

export default Alert;
