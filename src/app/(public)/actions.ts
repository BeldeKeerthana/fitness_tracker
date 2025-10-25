
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const name = email.split('@')[0];
    const redirectTo = formData.get('redirect_to') as string || '/dashboard';
    
    if (email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }

    redirect(redirectTo);
}

export async function handleOnboarding(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const redirectTo = formData.get('redirect_to') as string || '/dashboard';

    if (name && email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }
    
    redirect(redirectTo);
}
