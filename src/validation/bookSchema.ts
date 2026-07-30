import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(3, "Book title is requred"),
  author: z.string().min(3, "Author is required"),
  rate: z.coerce
    .number()
    .min(1, "Minimum rate is 1")
    .max(5, "Maximum rate is 5"),
  image: z.string().url("Enter a valid image url"),
});
export type BookFormData =z.infer<typeof bookSchema>;
