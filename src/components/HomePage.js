import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelves from "./BookShelves";

const HomePage = ({ allBooks, changeShelf }) => {
    const cFlag = "currentlyReading";
    const wFlag = "wantToRead";
    const rFlag = "read";

    const cReadingBooks = allBooks.filter((book) => book.shelf === cFlag);
    const wReadingBooks = allBooks.filter((book) => book.shelf === wFlag);
    const readingBooks = allBooks.filter((book) => book.shelf === rFlag);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div >
            <div className="list-books-content">
                <div>
                    <BookShelves books={cReadingBooks} changeShelf={changeShelf} title="Currently Reading" />
                    <BookShelves books={wReadingBooks} changeShelf={changeShelf} title="Want to Read" />
                    <BookShelves books={readingBooks} changeShelf={changeShelf} title="Read" />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div >
    );
}
HomePage.propTypes = {
    allBooks: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
};
export default HomePage;