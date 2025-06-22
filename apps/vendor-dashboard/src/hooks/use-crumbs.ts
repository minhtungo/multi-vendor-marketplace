import { isMatch, useMatches } from '@tanstack/react-router';

export function useCrumbs() {
  const matches = useMatches();

  if (matches.some((match) => match.status === 'pending')) return null;

  const matchesWithCrumbs = matches
    .filter(
      (match) =>
        (isMatch(match, 'loaderData.name') && match.loaderData?.name) ||
        (match.meta?.[0]?.title && match.id !== '__root__'),
    )
    .map((match) => ({
      name: match.loaderData?.name || match.meta?.[0]?.title,
      path: match.fullPath,
    }));

  return matchesWithCrumbs;
}
