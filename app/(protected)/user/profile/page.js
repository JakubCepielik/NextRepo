'use client'

import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserProfileForm() {
  const { user } = useAuth();
  const auth = getAuth();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState(""); 

  const onSubmit = (data) => {
    updateProfile(user, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Zapisz zmiany
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
