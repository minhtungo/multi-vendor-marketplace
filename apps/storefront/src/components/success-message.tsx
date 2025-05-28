export function SuccessMessage({ message }: { message?: string | null; 'data-testid'?: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className='pt-2 text-green-600 text-sm'>
      <span>{message}</span>
    </div>
  );
}
