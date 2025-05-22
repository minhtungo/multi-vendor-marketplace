import { NavHeader } from '@/components/app-sidebar/nav-header';
import { NavMain } from '@/components/app-sidebar/nav-main';
import { NavUser } from '@/components/app-sidebar/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@repo/ui/components/sidebar';
import { cn } from '@repo/ui/lib/utils';

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className={cn('h-full', className)} {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
