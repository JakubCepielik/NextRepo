'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function VerifyEmail() {
  const { user } = useAuth();
  const auth = getAuth();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  }, [auth]);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Email not verified
        </h1>
        <p className="text-gray-600">
          Please verify your email address by clicking on the link sent to {" "}
          <span className="font-medium text-blue-600">{user?.email}</span>.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          After verification, you can log in again.
        </p>
      </div>
    </section>
  );
}