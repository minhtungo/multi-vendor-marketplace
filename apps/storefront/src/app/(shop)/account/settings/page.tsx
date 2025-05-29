import { CardDescription, CardTitle } from '@repo/ui/components/card';

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your settings</CardDescription>
      </div>
    </div>
  );
}
