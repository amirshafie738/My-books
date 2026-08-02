import type { Book } from "../types/book";

interface Props {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={book.image}
        alt={book.title}
        className="mb-3 h-48 w-full rounded-lg object-cover bg-slate-100"
      />

      <h3 className="font-semibold text-slate-800 line-clamp-1">{book.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-1">{book.author}</p>
      <p className="mt-1 text-yellow-500">⭐ {book.rate}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 rounded-lg border border-indigo-500 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 rounded-lg border border-red-400 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;