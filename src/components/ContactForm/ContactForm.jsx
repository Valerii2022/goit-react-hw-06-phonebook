import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsNames } from 'redux/contactsSlice';
import { add } from '../../redux/contactsSlice';
import { Form, AddContactBtn, FormLabel, FormInput } from './styled';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsNames);
  let name = '';
  let number = '';

  const handleInputChange = e => {
    if (e.target.name === 'name') name = e.target.value;
    if (e.target.name === 'number') number = e.target.value;
  };

  const onSubmit = e => {
    e.preventDefault();
    const addedName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedName) {
      return alert(`${name} is already in contacts`);
    }

    const id = nanoid(10);
    dispatch(add({ id, name, number }));

    e.target[0].value = '';
    e.target[1].value = '';
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleInputChange}
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleInputChange}
          required
        />
      </FormLabel>
      <AddContactBtn>Add contacts</AddContactBtn>
    </Form>
  );
};
