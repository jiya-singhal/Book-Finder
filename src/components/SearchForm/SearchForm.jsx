import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const [suggestions, setSuggestions] = useState([]);
  const searchText = useRef('');
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const query = e.target.value.trim();

    if (query) {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
        const data = await response.json();

        if (Array.isArray(data.docs)) {
          setSuggestions(data.docs);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempSearchTerm = searchText.current.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
      setSearchTerm('Book Name here...');
      setResultTitle('Please Enter Something ...');
    } else {
      setSearchTerm(tempSearchTerm);
      setResultTitle(tempSearchTerm);
    }

    if (tempSearchTerm.length > 0) {
      navigate('/book');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    searchText.current.value = suggestion.title;
    setSearchTerm(suggestion.title);
    setResultTitle(suggestion.title);
    setSuggestions([]);
    navigate('/book');
  };

  useEffect(() => {
    if (searchText.current) {
      searchText.current.focus();
    }
  }, []);

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="Book Name here..."
                ref={searchText}
                onChange={handleInputChange}
              />
              <button type="submit" className="flex flex-c">
                <FaSearch className="text-blue" size={32} />
              </button>
            </div>
          </form>

          {suggestions.length > 0 && (
            <div className="suggestions">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
