import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";

export default function IndexActors() {
  return (
    <IndexEntity<actorDTO>
      url={urlActors}
      createURL="actors/create"
      title="Actors"
      entityName="Actor"
    >
      {(actors, buttons) => (
        <>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {actors?.map((actor, index) => (
              <tr key={actor.id}>
                <td>{index + 1} </td>
                <td>{actor.name}</td>
                <td>{buttons(`actors/edit/${actor.id}`, actor.id)}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
