import { SidebarTrigger } from '@repo/ui/components/sidebar';
import { useLocation } from '@tanstack/react-router';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname.replace('-', ' ').split('/');
  const pageTitle = pathname[pathname.length - 1];

  return (
    <header className="flex w-full items-center gap-1 border-b p-3">
      <SidebarTrigger className="-ml-1" />
      <h1 className="text-sm font-medium capitalize">{pageTitle || 'Home'}</h1>
    </header>
  );
}
