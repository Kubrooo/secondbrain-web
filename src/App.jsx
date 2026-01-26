import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight hover:text-gray-600 transition"
            >
              SecondBrain.
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-black transition"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                + New Note
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} <strong>SecondBrain</strong>.
              Designed & Built by{" "}
              <span className="text-black font-semibold">Ardiansyah</span>.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
