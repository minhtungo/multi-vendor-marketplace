import { EditProfileForm } from '@/modules/account/components/edit-profile-form';
import { getCustomer } from '@/server/customer/get-customer';

type ProfileTemplateProps = React.ComponentProps<'div'>;

export async function ProfileTemplate({}: ProfileTemplateProps) {
  const customer = await getCustomer();

  return (
    <div>
      <EditProfileForm customer={customer} />
    </div>
  );
}
