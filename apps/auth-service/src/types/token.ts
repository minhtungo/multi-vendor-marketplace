export type RefreshTokenPayload = {
	sub: string;
	sessionId: string;
};

export type AccessTokenPayload = {
	sub: string;
	email: string;
	userId: string;
	sessionId: string;
};
