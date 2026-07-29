import { BookOpenText } from 'lucide-react';
function Header() {
    return (
      <header className=" shadow ">
        <div className="max-w-7xl mx-auto px-6 py-5 ">
          <h1 className="text-2xl gap-2 font-bold flex justify-center items-center ">
          <BookOpenText size={25} className="text-violet-500 hover:text-blue-700 transition-colors" /> My Books
          </h1>
        </div>
      </header>
    );
  }
  
  export default Header;