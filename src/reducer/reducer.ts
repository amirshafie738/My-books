import type { State } from "../types/book";
import type { Action } from "./actions";


export const reducer = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    default:
      return state;
  }
};