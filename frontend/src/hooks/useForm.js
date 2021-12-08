import { useEffect, useState } from 'react';

export const useForm = (initialFields, cb = () => { }) => {

  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    cb(fields);
  }, [fields]);

  const handleChange = ({ target }) => {
    const field = target.name || target.id;
    let value = target.type === 'number' ? +target.value : target.value;
    if (typeof fields[field] === 'object') {
      const objCopy = Array.isArray(fields[field]) ? [...fields[field]] : { ...fields[field] };
      const key = target.dataset.key;
      objCopy[key] = value;
      value = objCopy;
    }
    setFields(prevFields => ({ ...prevFields, [field]: value }));
  };

  return [
    fields,
    handleChange,
    setFields
  ];
};