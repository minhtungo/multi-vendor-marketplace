declare namespace Express {
  export interface User {
    id: string;
    email: string;
  }

  export interface Request {
    user?: User;
  }
}
