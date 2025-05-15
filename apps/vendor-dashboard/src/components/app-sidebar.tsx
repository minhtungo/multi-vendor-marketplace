import { menu } from '@/configs/menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import { cn } from '@repo/ui/lib/utils';
import { Link } from '@tanstack/react-router';

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className={cn('h-full', className)} {...props}>
      <SidebarHeader className="p-4">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.dashboard.map((item) => (
              <SidebarMenuItem key={`${item.title}-nav-item`}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.href}
                    className="h-10"
                    activeProps={{
                      className: 'bg-accent',
                    }}
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <Button variant="ghost" className="justify-start" onClick={() => navigate({ to: '..' })}>
          <ArrowLeft />
          Go back
        </Button>
      </SidebarFooter> */}
    </Sidebar>
  );
}
