import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { TokenResponseDto, UserProfileDto } from '../auth/types';

function getBaseURL(): string {
    const envURL = Constants?.expoConfig?.extra?.apiBase as string | undefined;
    if (envURL) return envURL;
    if (__DEV__) {
        if (Platform.OS === 'android') return 'http://10.0.2.2:5000';
        return 'http://localhost:5000';
    }
    return 'https://api.buddyments.com';
}

const api: AxiosInstance = axios.create({
    baseURL: `${getBaseURL()}/api/auth`,
    headers: { 'Content-Type': 'application/json' },
});

const authApi = {
    async login(email: string, password: string): Promise<TokenResponseDto> {
        const { data } = await api.post<TokenResponseDto>('/login', { email, password });
        return data;
    },
    async register(email: string, userName: string, password: string): Promise<TokenResponseDto> {
        const { data } = await api.post<TokenResponseDto>('/register', { email, userName, password });
        return data;
    },
    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        const { data } = await api.post<TokenResponseDto>('/refresh', { refreshToken });
        return data;
    },
    async getProfile(accessToken: string): Promise<UserProfileDto> {
        const { data } = await api.get<UserProfileDto>('/profile', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return data;
    },
};

export default authApi;
