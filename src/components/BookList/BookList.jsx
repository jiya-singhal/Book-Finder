import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import coverImg from "../../images/cover_not_found.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id 
        ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` 
        : coverImg
    };
  });

  if (loading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="spinner-icon" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key={index} {...item} />
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default BookList;
