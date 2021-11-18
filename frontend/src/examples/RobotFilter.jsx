import { useForm } from '../hooks/useForm';
// sample for useForm hook

export const RobotFilter = ({ onChangeFilter }) => {
  const [filterBy, handleChange] = useForm({
    type: '',
    model: '',
  }, onChangeFilter);

  const { type, model } = filterBy;

  return (
    <>
      <h3>Filter by</h3>
      <form className="robot-filter">
        <label htmlFor="model">Model
          <input value={model} type="text" id="model" name="model" onChange={handleChange} />
        </label>

        <label htmlFor="type">Type
          <input value={type} type="text" id="type" name="type" onChange={handleChange} />
        </label>
      </form>
    </>
  );
};