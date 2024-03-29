import { movieDTO } from "../model/movies.model";
import css from "../assets/css/IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../context/AlertContext";
import Authorized from "../auth/Authorized";

export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movies/${props.id}`;
  const customAlert = useContext(AlertContext);
  function deleteMovie() {
    axios.delete(`${urlMovies}/${props.id}`).then(() => {
      customAlert();
    });
  }
  return (
    <div className={`col-md-4 col-lg-3 ${css.div} mb-2`}>
      <Link to={buildLink()}>
        <img alt="Poster" className="img-fluid" src={props.poster}></img>
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <Authorized
        role="admin"
        authorized={
          <>
            <div className="d-flex align-items-center justify-content-center">
              <Link
                to={`/movies/edit/${props.id}`}
                style={{ marginRight: "1rem" }}
                className="btn btn-info"
              >
                Edit
              </Link>
              <Button onClick={() => customConfirm(() => deleteMovie())}>
                Delete
              </Button>
            </div>
          </>
        }
      ></Authorized>
    </div>
  );
}
