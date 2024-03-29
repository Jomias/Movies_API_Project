import { Field, useFormikContext } from "formik";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import '../assets/css/MarkdownField.css'
  
export default function MarkdownField(props: markDownFieldProps) {
  const { values } = useFormikContext<any>();
  return (
    <div className="mb-3 form-markdown">
      <div>
        <label>{props.displayName}</label>
        <div>
          <Field name={props.field} as="textarea" className="form-textarea" />
        </div>
      </div>
      <div>
        <label>{props.displayName} (preview):</label>
        <div className="markdown-container">
          <ReactMarkdown>{values[props.field]}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

interface markDownFieldProps {
  displayName: string;
  field: string;
}
