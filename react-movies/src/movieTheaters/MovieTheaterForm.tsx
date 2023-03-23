import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import * as Yup from "yup";
import { movieTheaterCreationDTO } from "../model/movieTheaters.model";
import MapField from "../forms/MapField";
import coordinateDTO from "../utils/coordinates.model";

export default function MovieTheaterForm(props: movieTheaterForm) {
  //undefined when no display
  function transformCoordinates(): coordinateDTO[]{
    if (props.model.latitude && props.model.longitude) {
      const response: coordinateDTO = {
        lat: props.model.latitude,
        lng: props.model.longitude,
      };
      return [response];
    }

    return [];
  }
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This field is required!")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Name" field="name" />
          <div className="mb-3">
            <MapField
              latField="latitude"
              lngField="longitude"
              coordinates={transformCoordinates()}
            />
          </div>
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/movieTheaters">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieTheaterForm {
  model: movieTheaterCreationDTO;
  onSubmit(
    values: movieTheaterCreationDTO,
    action: FormikHelpers<movieTheaterCreationDTO>
  ): void;
}
