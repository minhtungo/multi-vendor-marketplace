import { menu } from '@/configs/menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import { Link } from '@tanstack/react-router';

type NavMainProps = React.ComponentProps<'div'>;

export function NavMain({}: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menu.dashboard.main.map((item) => (
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
