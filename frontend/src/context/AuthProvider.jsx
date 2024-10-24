import { createContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, accessToken: action.payload.accessToken, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, accessToken: null, isAuthenticated: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

/* eslint-disable-next-line react/prop-types */
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { user, accessToken } = await authService.refreshToken();
                if (user && accessToken) {
                    dispatch({ type: 'LOGIN', payload: { user, accessToken } });
                }
            } catch (error) {
                console.error('Failed to refresh token', error);
                dispatch({ type: 'LOGOUT' });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        // Check on initial load
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {!state.isLoading && children}
        </AuthContext.Provider>
    );
};


export default AuthContext;