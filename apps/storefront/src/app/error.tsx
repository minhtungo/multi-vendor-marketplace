'use client';

import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex h-screen items-center justify-center container'>
      <Card className='gap-4 justify-center text-center'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Error</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <p>{process.env.NODE_ENV === 'development' ? error.message : 'An error occurred. Please try again.'}</p>
          <Button onClick={() => reset()}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
