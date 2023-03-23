import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";

import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";

import CreateMovieTheater from "./movieTheaters/CreateMovieTheater";
import EditMovieTheater from "./movieTheaters/EditMovieTheater";
import IndexMovieTheaters from "./movieTheaters/IndexMovieTheaters";

import LandingPage from "./LandingPage";
import FilterMovies from "./movies/FilterMovies";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";
import MovieDetails from "./movies/MovieDetails";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true},
    {path: '/genres/create', component: CreateGenre},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre},

    {path: '/actors', component: IndexActors, exact: true},
    {path: '/actors/create', component: CreateActor},
    {path: '/actors/edit/:id(\\d+)', component: EditActor},

    {path: '/movieTheaters', component: IndexMovieTheaters, exact: true},
    {path: '/movieTheaters/create', component: CreateMovieTheater},
    {path: '/movieTheaters/edit/:id(\\d+)', component: EditMovieTheater},

    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/create', component: CreateMovie},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie},
    {path: '/movies/:id(\\d+)', component: MovieDetails},

    {path: '/', component: LandingPage, exact: true},
    {path: '*', component: RedirectToLandingPage}
]

export default routes;