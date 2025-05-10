import { Logo } from '@/components/common/logo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/card';
import Link from 'next/link';

type AuthContainerProps = React.ComponentProps<'div'> & {
  title: string;
  description: string;
  footerText?: string;
  footerLinkText?: string;
  footerLink?: string;
};

export function AuthContainer({
  title,
  description,
  footerText,
  footerLinkText,
  footerLink,
  children,
  ...props
}: AuthContainerProps) {
  return (
    <Card className='w-full sm:border-0 sm:shadow-none' {...props}>
      <CardHeader>
        <Link href='/'>
          <Logo />
        </Link>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && <CardDescription className='text-pretty'>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='w-full'>{children}</CardContent>
      {footerText && footerLink && (
        <CardFooter className='text-muted-foreground text-sm'>
          {footerText}
          <Link href={footerLink} className='text-foreground ml-1 underline underline-offset-4'>
            {footerLinkText}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
