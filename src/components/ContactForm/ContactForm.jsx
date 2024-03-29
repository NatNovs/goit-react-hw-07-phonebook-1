import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'store/contacts/contactsThunk';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts.items);

  const dispatch = useDispatch();

  const handlerChangeName = e => {
    setName(e.target.value);
  };
  const handlerChangePhone = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let isExists = contacts.some(el => el.name === name);
    // let isExists = false;
    const newContact = {
      name,
      number,
    };
    if (isExists) {
      alert(`${name} is already in contacts`);
    } else {
      console.log(newContact);
      dispatch(addContactThunk(newContact));
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <Input mb="15" id="name" onChange={handlerChangeName} type="text" name="name" value={name} required />
      <label htmlFor="phone">Phone</label>
      <Input mb="15" id="phone" onChange={handlerChangePhone} type="tel" name="number" value={number} required />
      <Button colorScheme="teal" type="submit">
        Add contact
      </Button>
    </form>
  );
};