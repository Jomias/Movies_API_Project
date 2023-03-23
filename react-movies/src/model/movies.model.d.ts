import { actorMovieDTO } from "./actors.model";
import { genreDTO } from "./genres.model";
import { movieTheaterDTO } from "./movieTheaters.model";

export interface movieDTO {
    id: number;
    title: string;
    poster: string;
    inTheaters: boolean;
    trailer: string;
    summary: string;
    releaseDate: Date;
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[];
    actors: actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDTO[];
    upcomingReleases?: movieDTO[];
}

export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatersIds?: number[];
    actors?: actorMovieDTO[];
}

export interface moviesPostGetDTO {
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[];
}

export interface moviesPutGetDTO {
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    actors: actorMovieDTO[];
}