'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function VerifyEmailNoticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleResend = async () => {
    setIsResending(true);
    setResendStatus('idle');
    setResendMessage('');

    try {
      const response = await api.post('/email/verification-notification');
      setResendStatus('success');
      setResendMessage(response.data.message || 'Verification email sent successfully');
    } catch (error: any) {
      setResendStatus('error');
      setResendMessage(
        error.response?.data?.message || 'Failed to resend verification email'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <svg
                  className="h-12 w-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Please check your email inbox and click on the verification link to activate your account.
              </p>
              {email && (
                <p className="text-sm font-medium">
                  Email sent to: <span className="text-primary">{email}</span>
                </p>
              )}
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or click the button below to resend.
              </p>
              {resendStatus === 'success' && (
                <p className="text-sm text-green-600">{resendMessage}</p>
              )}
              {resendStatus === 'error' && (
                <p className="text-sm text-destructive">{resendMessage}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={handleResend}
            disabled={isResending}
            variant="outline"
            className="w-full"
            size="lg"
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Already verified?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

