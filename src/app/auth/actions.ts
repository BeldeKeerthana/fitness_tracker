
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  console.log('Logging in with email:', email);
  
  // Set email cookie
  cookies().set('user-email', email, { path: '/', maxAge: 3600 });
  
  // In a real app, you'd handle authentication here.
  // We'll redirect to the onboarding page as if it's a new user.
  redirect(`/onboarding`);
}


export async function handleOnboarding(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const redirectTo = formData.get('redirect_to') as string || '/dashboard';
  console.log('Onboarding user:', name, Object.fromEntries(formData));
  // In a real app, you'd save this data to your database.
  
  // Set cookies for name and email
  cookies().set('user-name', name, { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days
  cookies().set('user-email', email, { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days

  redirect(`${redirectTo}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
}
