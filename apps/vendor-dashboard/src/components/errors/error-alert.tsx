import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { Button } from '@repo/ui/components/button';
import { Terminal } from 'lucide-react';

type ErrorAlertProps = React.ComponentProps<'div'> & {
  message: string;
  reset: () => void;
};

export function ErrorAlert({ message, reset }: ErrorAlertProps) {
  return (
    <div className="flex w-fit flex-col gap-4">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
