import { NavMain } from '@/components/app-sidebar/nav-main';
import { NavUser } from '@/components/app-sidebar/nav-user';
import { Sidebar, SidebarContent, SidebarFooter } from '@repo/ui/components/sidebar';
import { cn } from '@repo/ui/lib/utils';

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className={cn('h-full', className)} {...props}>
      {/* <SidebarHeader className="p-4">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences</p>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
