import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const Book = ({ cover_img, title, author = [], edition_count, first_publish_year, id }) => {
  return (
    <div className="book-item flex flex-column flex-sb" key={id}>
      <div className="book-item-img">
        <img
          src={cover_img || 'default-cover-image.jpg'}
          alt="cover"
        />
      </div>
      <div className="book-item-info text-center">
        <Link to={`/book/${id}`} className="book-link">
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{title}</span>
          </div>
        </Link>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          <span>{Array.isArray(author) ? author.join(", ") : 'No authors available'}</span>
        </div>

        <div className="book-item-info-item edition-count fs-15">
          <span className="text-capitalize fw-7">Total Editions: </span>
          <span>{edition_count ?? 'Not Available'}</span>
        </div>

        <div className="book-item-info-item publish-year fs-15">
          <span className="text-capitalize fw-7">First Publish Year: </span>
          <span>{first_publish_year ?? 'Not Available'}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
