import { urlGenres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { genreDTO } from "../model/genres.model";

export default function IndexGenres() {
  return (
    <>
      <IndexEntity<genreDTO>
        url={urlGenres}
        createURL="genres/create"
        title="Genres"
        entityName="Genre"
      >
        {(genres, buttons) => (
          <>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre, index) => (
                <tr key={genre.id}>
                  <td>{index + 1} </td>
                  <td>{genre.name}</td>
                  <td>{buttons(`genres/edit/${genre.id}`, genre.id)}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
