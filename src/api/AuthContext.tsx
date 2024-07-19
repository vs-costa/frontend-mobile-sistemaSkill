import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    userId: number | null;
}

export const api = axios.create({
    baseURL: 'http://192.168.1.5:8080/api'
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/systemUser/login', { email, password });
            const token = response.data.token;
            const userId = response.data.userId;
            await AsyncStorage.setItem('token', token);
            setIsAuthenticated(true);
            setUserId(userId);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token'); // Remove o token do AsyncStorage ao fazer logout
        setIsAuthenticated(false);
        setUserId(null);
    };

    // Verifica se o usuário está autenticado ao iniciar o aplicativo
    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    // Opcional: Faça uma requisição ao backend para verificar se o token é válido
                    await api.get('/verifyToken', { headers: { Authorization: `Bearer ${token}` } });
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Token inválido:', error);
                    await AsyncStorage.removeItem('token');
                }
            }
        };
        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
