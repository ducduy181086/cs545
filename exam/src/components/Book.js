function Book({book}) {
  return (
    <div style={{ border: "solid 1px", margin: "5px" }}>
      <h3>Title: {book.title}</h3>
      <div>Author: {book.author}</div>
      <div>Quantity: {book.quantity}</div>
    </div>
  );
}

export default Book;
