import type { State } from "../types/book";
import type { Action } from "./actions";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "GET_BOOKS":
      return { ...state, loading: false, books: action.payload };

    case "ADD_BOOK":
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };

    case "DELETE_BOOK":
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case "UPDATE_BOOK":
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };

    default:
      return state;
  }
};