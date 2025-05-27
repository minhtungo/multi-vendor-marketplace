import { useVendor } from '@/api/user/get-vendor';
import { getNameInitials } from '@/utils/name';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Card, CardHeader, CardTitle } from '@repo/ui/components/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/settings/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Profile',
      },
    ],
  }),
});

function RouteComponent() {
  const { data: vendor } = useVendor();

  if (!vendor) {
    return null;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={`${vendor.name} avatar`} />
              <AvatarFallback className="text-lg">{getNameInitials(vendor.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <CardTitle className="text-2xl font-bold">{vendor.name}</CardTitle>
                <Badge variant={getStatusVariant(vendor.status)} className="capitalize">
                  {vendor.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{vendor.email}</p>
              <p className="text-muted-foreground">{vendor.description}</p>
              <p className="text-muted-foreground">{vendor.phoneNumber}</p>
              <p className="text-muted-foreground">{vendor.address}</p>
              <p className="text-muted-foreground">{vendor.city}</p>
              <p className="text-muted-foreground">{vendor.state}</p>
              <p className="text-muted-foreground">{vendor.city}</p>
              <p className="text-muted-foreground">{vendor.postalCode}</p>
              <p className="text-muted-foreground">{vendor.country}</p>
              <p className="text-muted-foreground">{vendor.website}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
