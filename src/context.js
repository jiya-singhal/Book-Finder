import React, { useState, useContext, useEffect, useCallback } from 'react';

const URL = "https://openlibrary.org/search.json?title=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("Book name here..");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${debouncedSearchTerm}`);
            const data = await response.json();
            const { docs } = data;

            if (docs) {
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                    const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;
                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                    };
                });

                setBooks(newBooks);
                setResultTitle(newBooks.length > 1 ? "Your Search Result" : "No Search Result Found!");
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
        } catch (error) {
            console.error(error);
            setBooks([]);
            setResultTitle("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [debouncedSearchTerm, fetchBooks]);

    return (
        <AppContext.Provider value={{ loading, books, setSearchTerm, resultTitle, setResultTitle }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
