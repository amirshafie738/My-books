import type { Dispatch } from "react";
import type { Book, State } from "../types/book";
import type { Action } from "../reducer/actions";
import { deleteBook } from "../api/bookApis";
import BookCard from "./BookCard";
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {state.books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default BookList;