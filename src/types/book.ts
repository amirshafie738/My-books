export interface Book {
  id: string;
  title: string;
  author: string;
  rate: number;
  image: string;
}

export interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
}