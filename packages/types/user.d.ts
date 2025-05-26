export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
  plan: 'free' | 'pro';
};
