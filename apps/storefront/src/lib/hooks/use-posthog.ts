import type { PostHogEventData, PostHogEventName } from '@/lib/posthog/events';
import { usePostHog as usePostHogBase } from 'posthog-js/react';

export type TypeSafePostHog = {
  capture<T extends PostHogEventName>(eventName: T, properties: PostHogEventData<T>): void;

  identify(userId: string, properties?: Record<string, any>): void;

  setPersonProperties(properties: Record<string, any>): void;

  reset(): void;

  isFeatureEnabled(flag: string): boolean;

  getFeatureFlag(flag: string): string | boolean | undefined;
};

export function usePostHog(): TypeSafePostHog {
  const posthogBase = usePostHogBase();

  const isInitialized = (): boolean => {
    if (!posthogBase) {
      console.warn('PostHog not initialized');
      return false;
    }
    return true;
  };

  const capture = <T extends PostHogEventName>(eventName: T, properties: PostHogEventData<T>): void => {
    if (!isInitialized()) return;
    posthogBase.capture(eventName, properties);
  };

  const identify = (userId: string, properties?: Record<string, any>): void => {
    if (!isInitialized()) return;
    posthogBase.identify(userId, properties);
  };

  const setPersonProperties = (properties: Record<string, any>): void => {
    if (!isInitialized()) return;
    posthogBase.setPersonProperties(properties);
  };

  const reset = (): void => {
    if (!isInitialized()) return;
    posthogBase.reset();
  };

  const isFeatureEnabled = (flag: string): boolean => {
    if (!isInitialized()) return false;
    return Boolean(posthogBase.isFeatureEnabled(flag));
  };

  const getFeatureFlag = (flag: string): string | boolean | undefined => {
    if (!isInitialized()) return undefined;
    return posthogBase.getFeatureFlag(flag);
  };

  return {
    capture,
    identify,
    setPersonProperties,
    reset,
    isFeatureEnabled,
    getFeatureFlag,
  };
}
