import { NavGoBack } from '@/components/app-sidebar/nav-go-back';
import { NavMain } from '@/components/app-sidebar/nav-main';
import { NavSettings } from '@/components/app-sidebar/nav-settings';
import { NavUser } from '@/components/app-sidebar/nav-user';
import { Sidebar, SidebarContent, SidebarFooter } from '@repo/ui/components/sidebar';
import { cn } from '@repo/ui/lib/utils';
import { useLocation } from '@tanstack/react-router';

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="icon" className={cn('h-full', className)} {...props}>
      <SidebarContent>{pathname.startsWith('/settings') ? <NavSettings /> : <NavMain />}</SidebarContent>
      <SidebarFooter>
        <SidebarContent>{pathname.startsWith('/settings') ? <NavGoBack /> : <NavUser />}</SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
}
