declare namespace Express {
  export interface User {
    id: string;
    email: string;
    role: 'user' | 'vendor';
  }

  export interface Request {
    user?: User;
    sessionId?: string;
  }
}
