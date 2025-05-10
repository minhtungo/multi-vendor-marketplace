'use client';

import { useVerifyUserMutation } from '@/api/verify-user';
import { Button } from '@repo/ui/components/button';
import { FormResponse } from '@repo/ui/components/form-response';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/ui/components/input-otp';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { useState } from 'react';

interface OTPFormProps {
  email: string;
  password: string;
}

export function OTPForm({ email, password }: OTPFormProps) {
  const [otp, setOtp] = useState('');

  const {
    mutate: verifyUser,
    isPending: isVerifyPending,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyUserMutation();

  const onVerifyOTP = () => {
    verifyUser({
      email,
      password,
      otp,
    });
  };

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>Enter the 6-digit code sent to your email address</p>
      <div className='space-y-4'>
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
        {isVerifyError && (
          <FormResponse
            title='Error'
            variant='destructive'
            description={verifyError?.message || 'An error occurred while verifying your email.'}
          />
        )}
        {isVerifySuccess && (
          <FormResponse
            title='Success'
            variant='success'
            description='Your email has been verified successfully. You can now sign in.'
          />
        )}
        <LoaderButton
          isPending={isVerifyPending}
          className='w-full mt-3'
          onClick={onVerifyOTP}
          disabled={otp.length !== 6}
        >
          Verify OTP
        </LoaderButton>
        <Button variant='ghost' className='w-full'>
          Resend OTP
        </Button>
      </div>
    </div>
  );
}
