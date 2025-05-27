export function ErrorMessage({ error }: { error?: string | null; 'data-testid'?: string }) {
  if (!error) {
    return null;
  }

  return (
    <div className='pt-2 text-destructive text-sm'>
      <span>{error}</span>
    </div>
  );
}
