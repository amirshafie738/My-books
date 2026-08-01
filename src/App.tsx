import { useReducer } from "react";
import BookForm from "./component/BookForm";
import Header from "./component/Header";
import { reducer } from "./reducer/reducer";
import { initialState } from "./reducer/initialstate";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <BookForm />
          </div>

          <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
            Books
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
