export type UserProfileDto = {
    id: string;
    userName: string;
    email: string;
    createdAt: string;
};

export type TokenResponseDto = {
    accessToken: string;
    refreshToken: string;
};

export type ErrorResponseDto = {
    errorCode: string;
    errorDetails: string[];
};
