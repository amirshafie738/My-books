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
      try {
        const books = await getBooks();
        dispatch({ type: "GET_BOOKS", payload: books });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <BookForm
              dispatch={dispatch}
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Books</h2>

            <BookList
              books={state.books}
              dispatch={dispatch}
              onEdit={setSelectedBook}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;