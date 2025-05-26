import { useSignOut } from '@/api/auth/sign-out';
import { useVendor } from '@/api/user/get-vendor';
import { menu } from '@/configs/menu';
import { getNameInitials } from '@/utils/name';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@repo/ui/components/sidebar';
import { Link } from '@tanstack/react-router';
import { LogOut, MoreVerticalIcon } from 'lucide-react';

export function NavUser() {
  const { data: vendor } = useVendor();
  const { mutate: signOut } = useSignOut();
  const { isMobile } = useSidebar();

  if (!vendor) return null;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={''} alt={`${vendor.name}-avatar`} />
                <AvatarFallback className="rounded-lg">{getNameInitials(vendor.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{vendor.name}</span>
                <span className="text-muted-foreground truncate text-xs">{vendor.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" side={isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={''} alt={`${vendor.name}-avatar`} />
                  <AvatarFallback className="rounded-lg">{getNameInitials(vendor.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{vendor.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{vendor.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menu.userMenu.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link to={item.href}>
                    <item.icon />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
