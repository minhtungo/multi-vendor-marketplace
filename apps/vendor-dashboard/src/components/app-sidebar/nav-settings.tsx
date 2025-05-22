import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@repo/ui/components/sidebar';
import { Link } from '@tanstack/react-router';
import { Settings } from 'lucide-react';

type NavSettingsProps = React.ComponentProps<'div'>;

export function NavSettings({}: NavSettingsProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Settings" asChild>
          <Link
            to="/settings"
            activeProps={{
              className: 'bg-accent',
            }}
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
