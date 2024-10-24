import authService from '../services/authService';
import useAuth from './useAuth';


const useRefreshToken = () => {
    const { dispatch } = useAuth();

    const refresh = async () => {
        const data = await authService.refreshToken();

        dispatch({ type: 'LOGIN', payload: { accessToken: data.accessToken } });
        
        return data.accessToken; 
    }
    return refresh;
}; 

export default useRefreshToken;
