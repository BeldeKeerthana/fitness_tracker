'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


export async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const name = email.split('@')[0];
    
    if (email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }

    redirect('/dashboard');
}

export async function handleOnboarding(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (name && email) {
        cookies().set('user-name', name, { path: '/', httpOnly: true });
        cookies().set('user-email', email, { path: '/', httpOnly: true });
    }
    
    redirect('/dashboard');
}


export async function handleLogout() {
    cookies().delete('user-name');
    cookies().delete('user-email');
    redirect('/');
}
