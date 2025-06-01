import 'server-only';
import { generateSessionId, getSessionId, setSessionId } from '@/lib/cookies';

export async function getOrCreateSessionId() {
  const existingSessionId = await getSessionId();

  if (existingSessionId) {
    return;
  }

  const newSessionId = generateSessionId();
  await setSessionId(newSessionId);
}

export async function clearSession(): Promise<void> {
  const { removeSessionId } = await import('@/lib/cookies');
  await removeSessionId();
}
