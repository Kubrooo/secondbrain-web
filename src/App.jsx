import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddNote from './pages/AddNote';

function App() {
  return (
    <BrowserRouter>
      {}
      <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800">SecondBrain.</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
          <Link to="/add" className="bg-black text-white px-4 py-2 rounded-md text-sm">
            + New Note
          </Link>
        </div>
      </nav>

      {/* Area Konten yang Berubah-ubah */}
      <div className="max-w-4xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;