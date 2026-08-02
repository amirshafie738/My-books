import { useEffect, useReducer, useState } from "react";
import BookForm from "./component/BookForm";
import Header from "./component/Header";
import { reducer } from "./reducer/reducer";
import { initialState } from "./reducer/initialstate";
import BookList from "./component/BookList";
import { getBooks } from "./api/bookApis";
import type { Book } from "./types/book";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const books = await getBooks();
        dispatch({ type: "GET_BOOKS", payload: books });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to load books!" });
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-xl shadow p-6">
          <BookForm
            dispatch={dispatch}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-800">My Books</h2>
          <BookList state={state} dispatch={dispatch} onEdit={setSelectedBook} />
        </div>
      </main>
    </div>
  );
}

export default App;