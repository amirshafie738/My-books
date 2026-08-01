import type { Book } from "../types/book";
import type { BookFormData } from "../validation/bookSchema";
import api from "./axios";

// get
export const getBooks = async (): Promise<Book[]> => {
    const response = await api.get("/books");
    return response.data;
  };

  // add
export const addBook = async (book: BookFormData): Promise<Book> => {
    const response = await api.post("/books", book);
    return response.data;
  };
  
  // delete
  export const deleteBook = async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  };
  
  // edit
  export const updateBook = async (book: Book): Promise<Book> => {
    const response = await api.put(`/books/${book.id}`, book);
    return response.data;
  };