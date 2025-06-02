import { RequestOptions } from '@/lib/api-client';
import { type ReadonlyURLSearchParams } from 'next/navigation';

export function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
  return `${url}?${queryString}`;
}

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  {
    name,
    value,
  }: {
    name: string;
    value: string;
  }
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};
