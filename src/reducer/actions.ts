import type { Book } from "../types/book";


export type Action =
  | {
      type: "ADD_BOOK";
      payload: Book;
    };