import { useState, useEffect } from 'react';
import Form from '../components/Form';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

import s from './App.module.css';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) || initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contact => {
    const filterName = contact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === filterName)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, contact]);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  let lowerCaseContact = contacts;

  lowerCaseContact = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.trim())
  );
  return (
    <div className={s.cotainer}>
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={formSubmitHandler} />
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter handleFilter={handleFilter} value={filter} />
        <ContactList contacts={lowerCaseContact} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
