import type { Dispatch } from "react";
import type { Book, State } from "../types/book";
import type { Action } from "../reducer/actions";
import { deleteBook } from "../api/bookApis";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
  onEdit: (book: Book) => void;
}

function BookList({ state, dispatch, onEdit }: Props) {
  const handleDelete = async (id: string) => {
    dispatch({ type: "FETCH_START" });
    try {
      await deleteBook(id);
      dispatch({ type: "DELETE_BOOK", payload: id });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to delete book!" });
    }
  };

  if (state.loading) return <Loader />;
  if (state.error) return <ErrorMessage message={state.error} />;

  if (state.books.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center border-2 border-dashed rounded-lg">
        <p className="text-slate-400">No books found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.books.map((book) => (
        <div key={book.id} className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-slate-600">Author: {book.author}</p>
          <p className="text-yellow-500">⭐ {book.rate}</p>

          <img
            src={book.image}
            alt={book.title}
            className="mt-3 h-48 object-cover rounded"
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onEdit(book)}
              className="rounded-lg border border-indigo-500 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="rounded-lg border border-red-400 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;