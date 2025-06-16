import axios, { AxiosInstance, isAxiosError } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export function getApiBase(): string {
    const envURL = Constants?.expoConfig?.extra?.apiBase as string | undefined;
    if (envURL) return envURL;
    if (__DEV__) {
        const host = Constants?.expoConfig?.hostUri?.split(':')[0];
        if (host) return `http://${host}:5000`;

        if (Platform.OS === 'android') return 'http://10.0.2.2:5000';
        return 'http://localhost:5000';
    }
    return 'https://api.buddyments.com';
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: `${getApiBase()}/api`,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

export function digestAxiosError(err: unknown): Error {
    if (isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
            return new Error('Request timed out. Please try again.');
        }
        if (err.response) {
            const status = err.response.status;
            const data: any = err.response.data;
            const code = data?.errorCode;
            switch (status) {
                case 401:
                    return new Error(code || 'Unauthorized');
                case 409:
                    return new Error(code || 'Conflict');
                case 400:
                    return new Error(code || 'Bad request');
                default:
                    return new Error(code || 'Unexpected error');
            }
        }
        return new Error('Network error. Please check your connection.');
    }
    return err instanceof Error ? err : new Error('Unknown error');
}
