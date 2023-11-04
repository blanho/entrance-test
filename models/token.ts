export interface ITokenResponse {
    id: number;
    userId: number;
    refreshToken: string;
    expiresIn: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface IDecodedAccessToken {
    sub?: number;
    iat?: number;
}

export interface IDecodedRefreshToken {
    user: {
        sub: number
    }
    refreshToken: string
}

export interface IRefreshToken {
    refreshToken: string;
}