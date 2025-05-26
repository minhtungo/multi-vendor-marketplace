import { menu } from '@/configs/menu';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@repo/ui/components/sidebar';
import { Link } from '@tanstack/react-router';

export function NavSettings() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menu.settings.map((item) => (
          <SidebarMenuItem key={`${item.title}-nav-item`}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <Link
                to={item.href}
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
  );
}
