
import { Link } from "react-router-dom";
import {  useEffect,useState } from "react";
import PropTypes from "prop-types";
import {search} from "../services/BooksService";
import Book from "./Book";

const Search = ({ changeShelf }) => {
    const [query, setQuery] = useState("");
    const [rsSearch, setRsSearch] = useState([]);

    useEffect(() => {
      let isFlagEnd = false
  
      const searchBooks = async (query) => {
        if (isFlagEnd) return
        setRsSearch(await search(query))
      }
  
      if (query !== '') searchBooks(query)
    
      return () => isFlagEnd = true
    }, [query])

    const onUpdateQuery = (e) => {
      setQuery(e.target.value)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => onUpdateQuery(e)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {rsSearch && rsSearch.length > 0 && (
                    <div>
                        <strong>There are {rsSearch.length} books found in the library </strong>
                        <ol className="books-grid">
                            {rsSearch.map(book => (
                                <li key={book.id}>
                                    <Book book={book} changeShelf={changeShelf} />
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
                {rsSearch.length === 0 && (
                    <strong>Oops! No books were found according to the information you entered. Try entering again </strong>
                )}
            </div>
        </div>
    );
}

Search.propTypes = {
    changeShelf: PropTypes.func.isRequired
};

export default Search;