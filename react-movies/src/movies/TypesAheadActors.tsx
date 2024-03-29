import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../model/actors.model";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: typeAheadActorsProps) {
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);
  const selected: actorMovieDTO[] = [];

  function handleSearch(query: string) {
    setIsLoading(true);
    axios
      .get(`${urlActors}/searchByName/${query}`)
      .then((response: AxiosResponse<actorMovieDTO[]>) => {
        setActors(response.data);
        setIsLoading(false);
      });
  }
  function handleDragStart(actor: actorMovieDTO) {
    setDraggedElement(actor);
  }

  function handleDragOver(actor: actorMovieDTO) {
    if (!draggedElement) {
      return;
    }
    if (actor.id !== draggedElement.id) {
      const draggedElementIndex = props.actors.findIndex(
        (x) => x.id === draggedElement.id
      );
      const actorIndex = props.actors.findIndex((x) => x.id === actor.id);
      const actors = [...props.actors];
      actors[actorIndex] = draggedElement;
      actors[draggedElementIndex] = actor;
      props.onAdd(actors);
    }
  }
  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(actors) => {
          if (props.actors.findIndex((x) => x.id === actors[0].id) === -1) {
            actors[0].character = '';
            props.onAdd([...props.actors, actors[0]]);
          }
        }}
        labelKey={(actor) => actor.name}
        options={actors}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
        placeholder="Write the name of the actor..."
        minLength={1}
        maxResults={5}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              alt="actor"
              src={actor.picture}
              style={{ height: "64px", marginRight: "10px", width: "64px" }}
            />
            <span>{actor.name}</span>
          </>
        )}
      />
      <ul className="list-group list-">
        {props.actors.map((actor) => (
          <li
            key={actor.id}
            className="list-group-item list-group-item-action"
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface typeAheadActorsProps {
  onRemove(actor: actorMovieDTO): void;
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  listUI(actor: actorMovieDTO): ReactElement;
}
