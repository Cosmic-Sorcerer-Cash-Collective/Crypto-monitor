import React, { useState } from 'react';
import { Input, Flex, IconButton } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Flex align="center">
      <Input
        placeholder={placeholder}
        variant="filled"
        size="md"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <IconButton
        icon={<FaSearch />}
        aria-label="Rechercher"
        ml={2}
        size="md"
        onClick={handleSearch}
      />
    </Flex>
  );
}

export default SearchBar;
