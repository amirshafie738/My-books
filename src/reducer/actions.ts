import type { Book } from "../types/book";

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "GET_BOOKS"; payload: Book[] }
  | { type: "ADD_BOOK"; payload: Book }
  | { type: "DELETE_BOOK"; payload: string }
  | { type: "UPDATE_BOOK"; payload: Book };