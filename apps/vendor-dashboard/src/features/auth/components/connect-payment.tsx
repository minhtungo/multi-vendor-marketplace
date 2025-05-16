import { useConnectPaymentMutation } from '@/features/auth/api/connect-payment';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { toast } from 'sonner';

type ConnectPaymentProps = React.ComponentProps<'div'>;

export function ConnectPayment({}: ConnectPaymentProps) {
  const { mutate: connectPayment, isPending } = useConnectPaymentMutation();

  const handleConnectPayment = () => {
    connectPayment(
      {},
      {
        onSuccess: (data) => {
          window.location.href = data.data.url;
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <LoaderButton isPending={isPending} onClick={handleConnectPayment} disabled={isPending}>
      Connect Payment
    </LoaderButton>
  );
}
