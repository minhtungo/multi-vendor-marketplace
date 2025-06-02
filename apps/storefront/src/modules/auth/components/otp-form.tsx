'use client';

import { SubmitButton } from '@/modules/common/components/submit-button';
import { verifyUser } from '@/server/auth/verify-user';
import { Button } from '@repo/ui/components/button';
import { FormResponse } from '@repo/ui/components/form-response';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/ui/components/input-otp';
import { useActionState, useEffect, useState } from 'react';

type OTPFormProps = {
  email: string;
  password: string;
};

export function OTPForm({ email, password }: OTPFormProps) {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [state, formAction] = useActionState(verifyUser, null);

  const handleResendOTP = async () => {
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);
    await verifyUser(null, formData);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>Enter the 6-digit code sent to your email address</p>
      <form action={formAction} className='space-y-4'>
        <input type='hidden' name='email' value={email} />
        <input type='hidden' name='password' value={password} />
        <input type='hidden' name='otp' value={otp} />
        <div>
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {state && (
          <FormResponse
            title={state.success ? 'Success' : 'Error'}
            variant={state.success ? 'success' : 'destructive'}
            description={state?.message}
          />
        )}
        <SubmitButton className='w-full mt-3' disabled={otp.length !== 6}>
          Verify OTP
        </SubmitButton>
      </form>
      <Button variant='ghost' className='w-full' onClick={handleResendOTP} disabled={countdown > 0}>
        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
      </Button>
    </div>
  );
}
