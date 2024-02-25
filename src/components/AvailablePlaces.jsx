import { useState, useEffect } from "react";
import Error from "./Error";

import Places from "./Places.jsx";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  // Common to have these three below.
  const [isFetching, setIsFetching] = useState(false); // Loading, fetching state
  const [availablePlaces, setAvailablePlaces] = useState([]); // Data State
  const [error, setError] = useState(); // Error state, show potential errors

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/placess");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch");
        } //200, 300 good, 400, 500 not good
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message: error.message || "Could not fetch places, please try agian.",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data.."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
