import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar, Form, Button, Input } from './Searchbar.Styled';
import { FaSistrix } from 'react-icons/fa';

export function Searchbar({ dataForm }) {
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = event => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (pictureName.trim() === '') {
      toast.warn('There is no information in search field!');
      return;
    }
    setPictureName('');
    dataForm(pictureName);
  };

  return (
    <SearchBar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <span>
            <FaSistrix />
          </span>
        </Button>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          value={pictureName}
          onChange={handleNameChange}
        />
      </Form>
    </SearchBar>
  );
}
