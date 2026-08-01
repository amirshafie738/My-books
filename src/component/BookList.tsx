import type { Book } from "../types/book";

interface Props {
  books: Book[];
}

function BookList({ books }: Props) {
  if (books.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center border-2 border-dashed rounded-lg">
        <p className="text-slate-400">No books found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="border rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-xl font-semibold">
            {book.title}
          </h3>

          <p className="text-slate-600">
            Author: {book.author}
          </p>

          <p className="text-yellow-500">
            ⭐ {book.rate}
          </p>

          <img
            src={book.image}
            alt={book.title}
            className="mt-3 h-48 object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default BookList;