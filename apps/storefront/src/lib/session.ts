import 'server-only';

import { getSessionId, setSessionId } from '@/lib/cookies';

export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `guest_${timestamp}_${randomPart}`;
}

export async function getOrCreateSessionId(): Promise<string> {
  const existingSessionId = await getSessionId();

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = generateSessionId();
  await setSessionId(newSessionId);

  return newSessionId;
}

export async function clearSession(): Promise<void> {
  const { removeSessionId } = await import('@/lib/cookies');
  await removeSessionId();
}
