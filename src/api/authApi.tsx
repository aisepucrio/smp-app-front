import { apiClient, digestAxiosError } from './apiClient';
import { TokenResponseDto, UserProfileDto } from '../auth/types';

const authApi = {
    async login(email: string, password: string): Promise<TokenResponseDto> {
        try {
            const { data } = await apiClient.post<TokenResponseDto>('/auth/login', { email, password });
            return data;
        } catch (err) {
            throw digestAxiosError(err);
        }
    },
    async register(email: string, userName: string, password: string): Promise<TokenResponseDto> {
        try {
            const { data } = await apiClient.post<TokenResponseDto>('/auth/register', { email, userName, password });
            return data;
        } catch (err) {
            throw digestAxiosError(err);
        }
    },
    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        try {
            const { data } = await apiClient.post<TokenResponseDto>('/auth/refresh', { refreshToken });
            return data;
        } catch (err) {
            throw digestAxiosError(err);
        }
    },
    async getProfile(accessToken: string): Promise<UserProfileDto> {
        try {
            const { data } = await apiClient.get<UserProfileDto>('/auth/profile', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return data;
        } catch (err) {
            throw digestAxiosError(err);
        }
    },
};

export default authApi;
