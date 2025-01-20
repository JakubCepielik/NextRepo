'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc} from "firebase/firestore";

function ReadCars() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCars = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          const base = collection(db, "cars");
          const q = query(base, where("user","==", userRef));
          const querySnapshot = await getDocs(q);
          const carsData = querySnapshot.docs.map(docum => ({
            id: docum.id,
            ...docum.data(),
          }));
  
          setCars(carsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cars:', error);
          setLoading(false);
        }
      };

    fetchCars();
  }, [user]);

  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  if (!user) {
    return <p>Musisz być zalogowany, aby zobaczyć swoje samochody.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Twoje samochody</h1>

      {cars.length === 0 ? (
        <p>Nie znaleziono samochodów dla tego użytkownika.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-bold">{car.Model}</h2>
              <p>
                <strong>Model:</strong> {car.Brand}
              </p>
              <p>
                <strong>Rodzaj paliwa:</strong> {car.Fuel}
              </p>
              <p>
                <strong>Przebieg:</strong> {car.Mileage} km
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReadCars;
