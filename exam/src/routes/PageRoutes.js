import { Routes, Route, Navigate } from 'react-router-dom';

import Libraries from 'pages/Libraries';
import Books from 'pages/Books';
import AddBook from 'pages/AddBook';
import Missing from 'components/Missing';

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/libraries" />} />
      <Route path="/libraries" element={<Libraries />} />
      <Route path="/libraries/:libraryId/books" element={<Books />} />
      <Route path="/add-book" element={<AddBook />} />

      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default PageRoutes;
