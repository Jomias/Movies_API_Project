import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "./endpoints";
import { landingPageDTO } from "./movies/movies.model";
import MoviesList from "./movies/MoviesList";
import AlertContext from "./utils/AlertContext";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
      setMovies(response.data);
    });
  }
  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >
      <h3>In Theaters</h3>
      <MoviesList movies={movies.inTheaters} />
      <h3 className="mt-5">Upcoming</h3>
      <MoviesList movies={movies.upcomingReleases} />
    </AlertContext.Provider>
  );
}
