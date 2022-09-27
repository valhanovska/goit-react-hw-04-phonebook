import { Component } from 'react';
import Form from '../components/Form';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

import s from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsLocalStorage) {
      this.setState({ contacts: [...contactsLocalStorage] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = contact => {
    const { contacts } = this.state;

    const filterName = contact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === filterName)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    let lowerCaseContact = contacts;

    lowerCaseContact = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim())
    );

    return (
      <div className={s.cotainer}>
        <div>
          <h1>Phonebook</h1>
          <Form onSubmit={this.formSubmitHandler} />
        </div>
        <div>
          <h2>Contacts</h2>
          <Filter handleFilter={this.handleFilter} value={filter} />
          <ContactList
            contacts={lowerCaseContact}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}
