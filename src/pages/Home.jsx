import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading data...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Catatan Saya</h2>

      {/* Jika catatan kosong */}
      {notes.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">Belum ada catatan.</p>
          <Link to="/add" className="text-blue-600 font-bold hover:underline">
            Buat catatan pertama
          </Link>
        </div>
      ) : (
        /* Jika ada data, lakukan looping (mapping) */
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {note.content}
              </p>
              <div className="mt-4 text-xs text-gray-400">ID: {note.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
