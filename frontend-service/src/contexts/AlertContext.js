import React, { createContext, useState, useCallback } from 'react';
import Alert from '../components/Alert/Alert';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const showAlert = useCallback((message, variant) => {
        const id = new Date().getTime();
        setAlerts((prevAlerts) => [...prevAlerts, { id, message, variant }]);
    }, []);

    const removeAlert = useCallback((id) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <div className="alert-wrapper">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        message={alert.message}
                        variant={alert.variant}
                        onClose={() => removeAlert(alert.id)}
                    />
                ))}
            </div>
        </AlertContext.Provider>
    );
};
