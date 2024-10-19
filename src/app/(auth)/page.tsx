import { decrypt } from '@/utils/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const userId=await decrypt(cookies().get('session')?.value)
  if(userId?.userId) redirect('/links')
  else redirect('/signin');
}