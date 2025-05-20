export type RefreshTokenPayload = {
  sub: string;
  sessionId: string;
  role: 'user' | 'vendor';
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  userId: string;
  sessionId: string;
  role: 'user' | 'vendor';
};
