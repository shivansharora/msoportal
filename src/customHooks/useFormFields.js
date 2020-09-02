import { useState } from "react";

export function useFormFields(initialState,callback, validate) {
  const [fields, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.name]: event.target.value
      });
    }
  ];
}
