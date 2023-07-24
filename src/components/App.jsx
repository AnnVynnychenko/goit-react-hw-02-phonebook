import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Phonebook from './Phonebook';
import Contacts from './Contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = contactData => {
    const { name } = contactData;
    const ifNameTaken = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (ifNameTaken) {
      return alert(`${name} is already in contacts`);
    }
    const contactDataWithId = { ...contactData, id: nanoid() };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contactDataWithId],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Phonebook titleBegin="Phone" titleEnd="book">
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Contacts title="Contacts">
          <Filter filterValue={filter} onFilterContacts={this.filterContacts} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Contacts>
      </Phonebook>
    );
  }
}

export default App;
