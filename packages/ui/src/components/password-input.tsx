import { Input } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useId, useState } from 'react';

export function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
  const id = useId();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className={cn('relative', className)}>
      <Input
        id={id}
        className='pe-9'
        type={isVisible ? 'text' : 'password'}
        aria-describedby={`${id}-description`}
        {...props}
      />
      <button
        className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        type='button'
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        aria-controls='password'
        tabIndex={-1}
      >
        {isVisible ? <EyeOffIcon size={16} aria-hidden='true' /> : <EyeIcon size={16} aria-hidden='true' />}
      </button>
    </div>
  );
}
