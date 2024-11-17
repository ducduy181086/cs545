import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { libraryService } from "services/libraryService";

function AddBook() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({ title: "", author: "", quantity: 0, libraryId: state.id });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (state && state.id) {
      (async function () {
        const res = await libraryService.createBook(state.id, formData);
        navigate(`/libraries/${state.id}/books`, { state: state, key: state.id });
      })();
    }
  }

  const onChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h1>Add Book</h1>
      <div>
        <form onSubmit={handleAddBook}>
          <div><span>Title: </span><input name="title" type="text" value={formData.title} onChange={onChange} /></div>
          <div><span>Author: </span><input name="author" type="text" value={formData.author} onChange={onChange} /></div>
          <div><span>Quantity: </span><input name="quantity" type="number" value={formData.quantity} onChange={onChange} /></div>
          <div>
            <Link to={`/libraries/${state.id}/books`} state={state} key={state.id}>Back</Link>
            <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>&nbsp;</span>
            <button type="submit">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
