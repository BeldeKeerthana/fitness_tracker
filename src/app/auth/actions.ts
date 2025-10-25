
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const name = email.split('@')[0];
    const redirectTo = formData.get('redirect_to') as string || '/dashboard';
    
    // This is a mock login. In a real app, you'd validate credentials.
    if (email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }

    const redirectUrl = new URL(redirectTo, 'http://localhost');
    if (name) redirectUrl.searchParams.set('name', name);
    if (email) redirectUrl.searchParams.set('email', email);

    redirect(redirectUrl.pathname + redirectUrl.search);
}

export async function handleOnboarding(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const redirectTo = formData.get('redirect_to') as string || '/dashboard';

    // In a real app, you would save this user data to a database.
    if (name && email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }
    
    const redirectUrl = new URL(redirectTo, 'http://localhost');
    if (name) redirectUrl.searchParams.set('name', name);
    if (email) redirectUrl.searchParams.set('email', email);


    redirect(redirectUrl.pathname + redirectUrl.search);
}
