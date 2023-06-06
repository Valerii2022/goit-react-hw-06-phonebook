import { useSelector, useDispatch } from 'react-redux';
import { add, remove, getContactsNames } from '../redux/contactsSlice';
import { filter, getFilteredNames } from '../redux/filterSlice';

// import { useState } from 'react';
import { nanoid } from 'nanoid';
// import { ContactList } from './ContactList';
// import { ContactForm } from './ContactForm';
// import { Filter } from './Filter';
// import { useLocalStorage } from 'hooks/LocaleStorage';

// export const App = () => {
//   const [contacts, setContacts] = useLocalStorage('contacts', '');
//   const [filter, setFilter] = useState('');

//   const handleFindNameInput = e => {
//     setFilter(e.currentTarget.value);
//   };

//   const handleAddContacts = (contactName, contactNumber) => {
//     const addedName = contacts.some(
//       contact => contact.name.toLowerCase() === contactName.toLowerCase()
//     );

//     if (addedName) {
//       return alert(`${contactName} is already in contacts`);
//     }

// const id = nanoid(10);
//     setContacts([
//       ...contacts,
//       { name: contactName, id: id, number: contactNumber },
//     ]);
//   };

//   const handleContactsDelete = e => {
//     const names = contacts.filter(contact => contact.id !== e.currentTarget.id);
//     setContacts([...names]);
//   };

//   const renderNames = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <>
//       <h1>Phonebook</h1>
//       <ContactForm handleAddContacts={handleAddContacts} />
//       <h2>Contacts</h2>
//       <Filter filter={filter} findName={handleFindNameInput} />
//       <ContactList
//         contacts={renderNames}
//         handleContactsDelete={handleContactsDelete}
//       />
//     </>
//   );
// };

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsNames);
  const filteredContacts = useSelector(getFilteredNames);
  const renderNames = contacts.filter(contact =>
    contact.name.includes(filteredContacts.filter)
  );
  console.log(filteredContacts);
  console.log(contacts);
  let name = '';
  let number = '';

  const handleInputChange = e => {
    if (e.target.name === 'name') name = e.target.value;
    if (e.target.name === 'number') number = e.target.value;
  };

  const onSubmit = e => {
    const id = nanoid(10);
    e.preventDefault();
    dispatch(add({ id, name, number }));
    e.target[0].value = '';
    e.target[1].value = '';
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleInputChange}
          required
        />
        <button type="submit">add contact</button>
        {/* <button type="reset">reset</button> */}
      </form>

      {/* <ContactForm /> */}
      <h2>Contacts</h2>
      <form>
        <label>
          Find contacts by name
          <input
            type="text"
            name="searchName"
            onChange={e => dispatch(filter(e.target.value))}
          />
        </label>
      </form>
      {/* <button type="button" onClick={() => dispatch(remove(5))}>
        remove
      </button> */}
      {/* <Filter />
      <ContactList /> */}
      {/* <p>Contacts: {numberOfUsers}</p> */}

      <ul>
        {renderNames.map(({ name, id, number }) => {
          return (
            <li key={id}>
              <p>
                {name}: <span>{number}</span>
              </p>
              <button onClick={() => dispatch(remove(id))}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
