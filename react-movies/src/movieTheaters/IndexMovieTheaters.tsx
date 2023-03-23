import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheaters.model";

export default function IndexMovieTheaters() {
  return (
    <IndexEntity<movieTheaterDTO>
      url={urlMovieTheaters}
      createURL="movieTheaters/create"
      title="Movie Theaters"
      entityName="MovieTheater"
    >
      {(movieTheaters, buttons) => (
        <>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movieTheaters?.map((movieTheater, index) => (
              <tr key={movieTheater.id}>
                <td>{index + 1} </td>
                <td>{movieTheater.name}</td>
                <td>{buttons(`movieTheaters/edit/${movieTheater.id}`, movieTheater.id)}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
