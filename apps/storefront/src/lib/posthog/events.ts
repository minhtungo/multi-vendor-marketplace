const AUTH_METHODS = ['google', 'email'] as const;

export type PostHogEventMap = {
  // Authentication events
  SIGNED_IN: {
    userId: string;
    email?: string;
    method: (typeof AUTH_METHODS)[number];
  };

  SIGNED_OUT: {
    userId: string;
    sessionDuration?: number;
  };

  SIGN_UP_STARTED: {
    method: (typeof AUTH_METHODS)[number];
  };

  SIGN_UP_COMPLETED: {
    userId: string;
    email?: string;
    method: (typeof AUTH_METHODS)[number];
  };
};

export type PostHogEventName = keyof PostHogEventMap;
export type PostHogEventData<T extends PostHogEventName> = PostHogEventMap[T];
