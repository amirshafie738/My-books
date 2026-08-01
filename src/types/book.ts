export interface Book {
    id: number;
    title: string;
    author: string;
    rate: number;
    image: string;
  }
  
  export interface State {
    books: Book[];
  }