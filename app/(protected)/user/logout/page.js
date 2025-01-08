'use client';

import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        router.push('/user/login'); // Przekierowanie na stronę logowania po wylogowaniu
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    };

    performLogout();
  }, [router]);

  return null;
}
