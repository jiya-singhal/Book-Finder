import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
      <Navbar /> 
      <header className='header'>
        <div className='header-content'>
          <div className='header-text-container'>
            <h2 className='header-title text-capitalize'>Find Your Next Book to Read.</h2><br />
            <p className='header-text fs-18 fw-3'>
              Whether you're looking for textbooks to aid your studies, novels to unwind after a long day of lectures, or guides to deepen your knowledge, you've come to the right place. Find books across every genre and interest, right here.
            </p>
            <p className='header-text fs-18 fw-3'>
              Explore new releases, trending books, or dive into your favorite categories. Get personalized book recommendations based on your preferences. Let us help you discover your next great read.
            </p>
            <SearchForm />
          </div>
          <div className='header-image'></div>
        </div>
      </header>
    </div>
  );
}

export default Header;
