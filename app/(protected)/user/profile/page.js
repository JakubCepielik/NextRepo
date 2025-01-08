'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/app/lib/firebase';
import defaultProfileImage from '@/components/profile_default.jpg'; // Zaimportuj obraz
import Image from "next/image";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <h1>Please log in to view your profile.</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <Image 
          src={ defaultProfileImage} // Użyj zaimportowanego obrazu jako domyślnego
          alt="User Avatar"
          style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        />
        <h2>Name: {user.displayName || 'Anonymous'}</h2>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserPage;