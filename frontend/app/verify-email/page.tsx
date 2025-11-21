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


export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    const hash = searchParams.get('hash');

    if (!id || !hash) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.get('/email/verify', {
          params: { id, hash },
        });
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully');
      } catch (error: any) {
        setStatus('error');
        setMessage(
          error.response?.data?.message || 'Failed to verify email. The link may have expired.'
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Email Verification
          </CardTitle>
          <CardDescription className="text-center">
            {status === 'loading' && 'Verifying your email...'}
            {status === 'success' && 'Verification complete!'}
            {status === 'error' && 'Verification failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'loading' && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg">✓</div>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center space-y-4">
              <div className="text-destructive text-lg">✗</div>
              <p className="text-sm text-destructive">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {status === 'success' && (
            <div className="space-y-2 w-full">
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
                size="lg"
              >
                Go to Login
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your email has been verified. You can now sign in to your account.
              </p>
            </div>
          )}
          {status === 'error' && (
            <>
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
                variant="outline"
                size="lg"
              >
                Back to Login
              </Button>
              <Link href="/register" className="text-sm text-primary hover:underline">
                Create a new account
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

