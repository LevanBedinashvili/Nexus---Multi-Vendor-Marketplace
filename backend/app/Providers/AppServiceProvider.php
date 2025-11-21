<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return $frontendUrl . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);
        });

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return $frontendUrl . '/verify-email?id=' . $notifiable->getKey() . '&hash=' . sha1($notifiable->getEmailForVerification());
        });
    }
}
