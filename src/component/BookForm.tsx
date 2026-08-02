import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "./Input";
import type { Dispatch } from "react";
import type { Action } from "../reducer/actions";
import type { Book } from "../types/book";
import { bookSchema, type BookFormData } from "../validation/bookSchema";
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

  useEffect(() => {
    if (selectedBook) {
      reset({
        title: selectedBook.title,
        author: selectedBook.author,
        rate: selectedBook.rate,
        image: selectedBook.image,
      });
    }
  }, [selectedBook, reset]);

  const cancelEdit = () => {
    setSelectedBook(null);
    reset({ title: "", author: "", rate: undefined, image: "" });
  };

  const submitHandler = async (data: BookFormData) => {
    if (selectedBook) {
      try {
        const updatedBook = await updateBook({ id: selectedBook.id, ...data });
        dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
        setSelectedBook(null);
        reset({ title: "", author: "", rate: undefined, image: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newBook = await addBook(data);
        dispatch({ type: "ADD_BOOK", payload: newBook });
        reset({ title: "", author: "", rate: undefined, image: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <h2 className="text-2xl font-bold">
        {selectedBook ? "Edit Book" : "Add New Book"}
      </h2>

      <Input label="Book Name" placeholder="Book Name" {...register("title")} error={errors.title?.message} />
      <Input label="Author" placeholder="Author" {...register("author")} error={errors.author?.message} />
      <Input type="number" label="Rate" placeholder="1-5" {...register("rate", { valueAsNumber: true })} error={errors.rate?.message} />
      <Input label="Cover Image" placeholder="https://..." {...register("image")} error={errors.image?.message} />

      <div className="flex gap-2">
        <button className="flex-1 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
          {selectedBook ? "Save Changes" : "Add Book"}
        </button>

        {selectedBook && (
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-lg border border-slate-300 px-4 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;