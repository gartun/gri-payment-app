import { useField } from "formik";

const sharedStyle = (errPredicate) =>
  `flex-input border-1 border-solid border-gray-600 p-2 rounded-lg shadow-md ${
    errPredicate ? "bg-red-200 border-red-500" : ""
  }`;

export const MyField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const shouldShowErr = meta.touched && meta.error;

  return (
    <>
      <div className="pb-1">
        <div className="flex justify-between items-center flex-wrap">
          <label htmlFor={props.id || props.name} className="flex-label">
            {label}
          </label>
          <input
            className={`${sharedStyle(shouldShowErr)}`}
            {...field}
            {...props}
          />
        </div>
        {shouldShowErr && (
          <p className="text-red-500 text-right font-bold mb-3">{meta.error}</p>
        )}
      </div>
    </>
  );
};

export const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const shouldShowErr = meta.touched && meta.error;

  return (
    <>
      <div className="pb-1">
        <div className="flex justify-between items-center flex-wrap">
          <label htmlFor={props.id || props.name} className="flex-label">
            {label}
          </label>
          <textarea
            className={`${sharedStyle(shouldShowErr)}`}
            {...field}
            {...props}
          />
        </div>
        {shouldShowErr && (
          <p className="text-red-500 text-right font-bold mb-3">{meta.error}</p>
        )}
      </div>
    </>
  );
};

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const shouldShowErr = meta.touched && meta.error;

  return (
    <>
      <div className="pb-1">
        <div className="flex justify-between items-center flex-wrap">
          <label htmlFor={props.id || props.name} className="flex-label">
            {label}
          </label>
          <select
            className={`${sharedStyle(shouldShowErr)}`}
            {...field}
            {...props}
          />
        </div>
        {shouldShowErr && (
          <p className="text-red-500 text-right font-bold mb-3">{meta.error}</p>
        )}
      </div>
    </>
  );
};
