import { Link } from 'react-router-dom';

function Library({ library }) {
  return (
    <div style={{ border: "solid 1px", margin: "5px" }}>
      <h3>{library.name}</h3>
      <div>City: {library.city}</div>
      <Link to={`${library.id}/books`} state={library} key={library.id}>Books</Link>
    </div>
  );
}

export default Library;
