import { useEffect } from "react";
import type { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "./Input";
import type { Action } from "../reducer/actions";
import type { Book } from "../types/book";
import { bookSchema, type BookFormData, } from "../validation/bookSchema";
import { addBook, updateBook } from "../api/bookApis";

interface Props {
  dispatch: Dispatch<Action>;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}

function BookForm({ dispatch, selectedBook, setSelectedBook }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  // edit mode: fill the form when a book is selected
  useEffect(() => {
    if (selectedBook) {
      reset({
        title: selectedBook.title,
        author: selectedBook.author,
        rate: selectedBook.rate,
        image: selectedBook.image,
      });
    }
  }, [selectedBook]);

  const cancelEdit = () => {
    setSelectedBook(null);
    reset({ title: "", author: "", rate: undefined, image: "" });
  };

  const submitHandler = async (data: BookFormData) => {
    dispatch({ type: "FETCH_START" });

    if (selectedBook) {
      // edit
      try {
        const updatedBook = await updateBook({
          id: selectedBook.id,
          title: data.title,
          author: data.author,
          rate: data.rate,
          image: data.image,
        });
        dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
        reset({ title: "", author: "", rate: undefined, image: "" });
        setSelectedBook(null);
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to update book!" });
      }
    } else {
      // add
      try {
        const newBook = await addBook(data);
        dispatch({ type: "ADD_BOOK", payload: newBook });
        reset({ title: "", author: "", rate: undefined, image: "" });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to add book!" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <h2 className="text-lg font-bold text-slate-800">
        {selectedBook ? "Edit Book" : "Add New Book"}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
        <Input
          label="Book Name"
          placeholder="Enter book name"
          {...register("title")}
          error={errors.title?.message}
        />

        <Input
          label="Author"
          placeholder="Enter author name"
          {...register("author")}
          error={errors.author?.message}
        />

        <Input
          type="number"
          label="Rating (1-5)"
          placeholder="Enter rating"
          {...register("rate", { valueAsNumber: true })}
          error={errors.rate?.message}
        />

        <Input
          label="Cover Image URL"
          placeholder="Enter image URL"
          {...register("image")}
          error={errors.image?.message}
        />

        <div className="flex gap-2 lg:pt-8">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            {selectedBook ? "Save Changes" : "Add Book"}
          </button>

          {selectedBook && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default BookForm;