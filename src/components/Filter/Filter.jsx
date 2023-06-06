import { useDispatch } from 'react-redux';
import { filter } from 'redux/filterSlice';
import { FindLabel, FindInput, Form } from './styled';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Form>
      <FindLabel>
        Find contacts by name
        <FindInput
          type="text"
          name="searchName"
          onChange={e => dispatch(filter(e.target.value))}
        />
      </FindLabel>
    </Form>
  );
};
