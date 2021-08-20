import React from 'react';
import { Input } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

const SearchInput = ({ onChange, timeout = 0 }) => {
  const handleChangeSearch = (e, { value }) => {
    onChange(value);
  };

  const requestDebounce = timeout
    ? debounce(handleChangeSearch, timeout)
    : onChange;

  return (
    <Input
      icon="search"
      placeholder="Search..."
      fluid
      onChange={requestDebounce}
      className="input-search"
    />
  );
};

export default SearchInput;
