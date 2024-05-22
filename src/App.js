import "./App.css";
import { useState, useEffect } from "react";
import * as BooksService from "./services/BooksService";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Search from "./components/Search";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksService.getAll();
      setAllBooks(res);
    }
    getBooks();
  }, [])

  const changeShelf = async (shelf, updatedBook) => {
    await BooksService.update(updatedBook, shelf);
    updatedBook.shelf = shelf;
    setAllBooks(allBooks.filter((book) => book.id !== updatedBook.id).concat(updatedBook));
  }
  
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomePage allBooks={allBooks} changeShelf={changeShelf} />} />
        <Route exact path="/search" element={<Search changeShelf={changeShelf} />} />
      </Routes>
    </div >
  );
}

export default App;
