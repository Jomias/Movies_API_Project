import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheaters.model";

export default function EditMovieTheater() {

  return (
    <>
      <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
        url={urlMovieTheaters}
        entityName="Movie Theaters"
        indexURL="/movieTheaters">
        {(entity, edit) => 
        <MovieTheaterForm model={entity}
        onSubmit= {async value => {
          await edit(value)
        }}/>}
      </EditEntity>
    </>
  );
}
