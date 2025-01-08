'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null); // Stan do przechowywania błędów
  const router = useRouter();

  const onSubmit = (data) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            router.push('/user/profile'); // Przekierowanie na stronę logowania po sukcesie
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            setErrorMessage("Nie ma takiego użytkownika lub hasło jest niepoprawne!"); // Ustawienie komunikatu o błędzie
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleErrorClose = () => {
    setErrorMessage(null); // Ukryj komunikat o błędzie
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Witaj
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Zaloguj się byku
            </p>

            {/* Formularz logowania */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Musisz podać adres email!"
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Adres email ma niepoprawny format"
                    }
                  })}
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm"
                />
                <p className="text-red-500 mt-3">{errors.email?.message}</p>
              </div>

              <div className="col-span-6 ">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                <input
                  {...register("password", {
                    required: "Musisz podać hasło",
                    minLength: {
                      value: 6,
                      message: "Zbyt krótkie hasło!"
                    }
                  })}
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm"
                />
                <p className="text-red-500 mt-3">{errors.password?.message}</p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Modal błędu */}
            {errorMessage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold text-red-500 mb-4">Błąd logowania</h2>
                  <p className="text-gray-700">{errorMessage}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleErrorClose}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default LoginForm;
