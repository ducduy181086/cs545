import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { libraryService } from "services/libraryService";
import Book from "components/Book";

function Books() {
  const { state } = useLocation();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async function() {
      const items = await libraryService.getAllBooks(state.id);
      setBooks(items);
    })();
  }, []);

  return (
    <div style={{marginBottom: "20px"}}>
      <h1>Books in {state.name}</h1>
      <div>
        {books.map(book => <Book key={book.id} book={book} />)}
      </div>
      <div>
        <Link to="/libraries">Back</Link>
        <span style={{paddingLeft: "20px", paddingRight: "20px"}}>&nbsp;</span>
        <Link to="/add-book" state={state} key={state.id}>Add Book</Link>
      </div>
    </div>
  );
}

export default Books;
