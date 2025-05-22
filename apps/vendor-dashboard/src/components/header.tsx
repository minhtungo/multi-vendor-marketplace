import { useLocation } from '@tanstack/react-router';

export default function Header() {
  const location = useLocation();
  const pageTitle = location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1);
  return (
    <header className="flex h-14 w-full items-center justify-between border-b p-3">
      <h1 className="text-base font-medium">{pageTitle || 'Home'}</h1>
    </header>
  );
}
