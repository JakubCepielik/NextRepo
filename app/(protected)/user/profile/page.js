'use client'

import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from '@/app/lib/firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function UserProfileForm() {
  const { user } = useAuth();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user?.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address;
          setValue("city", address.city);
          setValue("street", address.street);
          setValue("zipCode", address.zipCode);
        }
      } catch (e) {
        console.error("Error fetching address: ", e);
        setError("Nie udało się załadować adresu.");
      } finally {
        setLoading(false); 
      }
    };

    if (user?.uid) {
      fetchAddress();
    }
  }, [user?.uid, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      await setDoc(doc(db, "users", user?.uid), {
        address: {
          city: data.city,
          street: data.street,
          zipCode: data.zipCode,
        }
      });

      console.log("Profile and address updated");
    } catch (e) {
      console.error("Error updating document: ", e);
      setError("Nie masz odpowiednich uprawnień do zapisu.");
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900">Twój profil</h1>

        {user?.photoURL && (
          <div className="mt-4">
            <img
              src={user.photoURL}
              alt="Zdjęcie profilowe"
              className="w-24 h-24 rounded-full border"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 rounded">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Nazwa wyświetlana
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              {...register("displayName")}
              defaultValue={user?.displayName || ""}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              URL zdjęcia profilowego
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              {...register("photoURL")}
              defaultValue={user?.photoURL || ""}
              disabled={loading} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Ulica
            </label>
            <input
              type="text"
              id="street"
              name="street"
              {...register("street")}
              disabled={loading} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Miasto
            </label>
            <input
              type="text"
              id="city"
              name="city"
              {...register("city")}
              disabled={loading} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Kod pocztowy
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              {...register("zipCode")}
              disabled={loading} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading} 
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Ładowanie..." : "Zapisz zmiany"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
