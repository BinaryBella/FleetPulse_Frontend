import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Token');
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem('Token', token);
        setIsAuthenticated(true);
        navigate('/app/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('Token');
        setIsAuthenticated(false);
        navigate('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
