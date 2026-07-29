import Header from "./component/Header";


function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            Form
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            Books
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;