export default function DisplayErrors(props: displayErrorsProps) {
  const style = { color: "red" };
  if (props.errors && props.errors.length === 0) {
    return null;
  }
  return (
    <>
      <ul style={style}>
        {props.errors?.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </>
  );
}

interface displayErrorsProps {
  errors?: string[];
}
