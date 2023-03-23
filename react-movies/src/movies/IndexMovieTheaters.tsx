import { Link } from "react-router-dom";

export default function IndexMovieTheaters() {
    return (
        <>
            <h3>Actors</h3>
            <Link className ="btn btn-primary" to="/movieTheaters/create">Create movie theater</Link>
            <Link className ="btn btn-primary" to="/movieTheaters/edit">Edit movie theater</Link>
        </>
    )
}