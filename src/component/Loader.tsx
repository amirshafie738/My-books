function Loader() {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />
        <p className="text-lg font-medium text-slate-500">Loading...</p>
      </div>
    );
  }
  
  export default Loader;