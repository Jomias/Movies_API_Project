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
import Register from "./auth/Register";
import Login from "./auth/Login";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true, isAdmin: true},
    {path: '/genres/create', component: CreateGenre, isAdmin: true},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre, isAdmin: true},

    {path: '/actors', component: IndexActors, exact: true, isAdmin: true },
    {path: '/actors/create', component: CreateActor, isAdmin: true},
    {path: '/actors/edit/:id(\\d+)', component: EditActor, isAdmin: true},

    {path: '/movieTheaters', component: IndexMovieTheaters, exact: true, isAdmin: true },
    {path: '/movieTheaters/create', component: CreateMovieTheater, isAdmin: true},
    {path: '/movieTheaters/edit/:id(\\d+)', component: EditMovieTheater, isAdmin: true},

    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/create', component: CreateMovie, isAdmin: true},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie, isAdmin: true},
    {path: '/movies/:id(\\d+)', component: MovieDetails},

    {path: '/register', component: Register},
    {path: '/login', component: Login},


    {path: '/', component: LandingPage, exact: true},
    {path: '*', component: RedirectToLandingPage}
]

export default routes;