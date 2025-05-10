'use client';

import { signUpSchema } from '@/features/auth/api/sign-up';
import { useVerifyUserMutation } from '@/features/auth/api/verify-user';
import { Button } from '@repo/ui/components/button';
import { FormResponse } from '@repo/ui/components/form-response';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/ui/components/input-otp';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';

interface OTPFormProps {
  userInput: z.infer<typeof signUpSchema>;
}

export function OTPForm({ userInput }: OTPFormProps) {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const { mutate: verifyUser, isPending, isSuccess, isError, error } = useVerifyUserMutation();

  const handleVerifyOTP = () => {
    verifyUser(
      {
        email: userInput.email,
        password: userInput.password,
        otp,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
      }
    );
  };

  const handleResendOTP = () => {
    // TODO: Implement resend OTP API call
    setCountdown(60);
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
        {isError && (
          <FormResponse
            title='Error'
            variant='destructive'
            description={error?.message || 'An error occurred while verifying your email.'}
          />
        )}
        {isSuccess && (
          <FormResponse
            title='Success'
            variant='success'
            description='Your email has been verified successfully. You can now sign in.'
          />
        )}
        <LoaderButton
          isPending={isPending}
          className='w-full mt-3'
          onClick={handleVerifyOTP}
          disabled={otp.length !== 6}
        >
          Verify OTP
        </LoaderButton>
        <Button variant='ghost' className='w-full' onClick={handleResendOTP} disabled={countdown > 0}>
          {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
        </Button>
      </div>
    </div>
  );
}
