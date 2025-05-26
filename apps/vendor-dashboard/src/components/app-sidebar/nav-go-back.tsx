import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@repo/ui/components/sidebar';
import { ArrowLeftIcon } from '@repo/ui/icons';
import { useRouter } from '@tanstack/react-router';

type NavGoBackProps = React.ComponentProps<'div'>;

export function NavGoBack({}: NavGoBackProps) {
  const router = useRouter();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Go back" onClick={() => router.history.back()}>
          <ArrowLeftIcon />
          Go back
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
