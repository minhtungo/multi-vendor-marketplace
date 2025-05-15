import { useCreateStripeConnectLinkMutation } from '@/features/auth/api/create-stripe-connect-link';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { toast } from 'sonner';

type ConnectPaymentProps = React.ComponentProps<'div'>;

export function ConnectPayment({}: ConnectPaymentProps) {
  const { mutate: createStripeConnectLink, isPending } = useCreateStripeConnectLinkMutation();

  const handleConnectPayment = () => {
    createStripeConnectLink(
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
    <div>
      <LoaderButton isPending={isPending} onClick={handleConnectPayment} disabled={isPending}>
        Connect Payment
      </LoaderButton>
    </div>
  );
}
