import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "./Input";
import type { Dispatch } from "react";
import type { Action } from "../reducer/actions";
import { bookSchema, type BookFormData } from "../validation/bookSchema";
interface Props {
  dispatch: Dispatch<Action>;
}

function BookForm({ dispatch }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });
  const submitHandler = (data: BookFormData) => {

    dispatch({
      type: "ADD_BOOK",
      payload: {
        id: Date.now(),
        ...data,
      },
    });

    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <h2 className="text-2xl font-bold">Add New Book</h2>

      <Input
        label="Book Name"
        placeholder="Book Name"
        {...register("title")}
        error={errors.title?.message}
      />

      <Input
        label="Author"
        placeholder="Author"
        {...register("author")}
        error={errors.author?.message}
      />

      <Input
        type="number"
        label="Rate"
        placeholder="1-5"
        {...register("rate", {
          valueAsNumber: true,
        })}
        error={errors.rate?.message}
      />

      <Input
        label="Cover Image"
        placeholder="https://..."
        {...register("image")}
        error={errors.image?.message}
      />

      <button className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
        Add Book
      </button>
    </form>
  );
}

export default BookForm;
