import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = () => {
    fetch("http://localhost:3000/notes")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    // Tampilkan Konfirmasi Mewah
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Catatan ini tidak bisa dikembalikan loh!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000", // Hitam (sesuai tema)
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire({
              title: "Terhapus!",
              text: "Catatan berhasil dimusnahkan.",
              icon: "success",
              confirmButtonColor: "#000000",
            });
            fetchNotes(); // Refresh data
          }
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-20">Loading data...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Catatan Saya</h2>

      {notes.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">Belum ada catatan.</p>
          <Link to="/add" className="text-blue-600 font-bold hover:underline">
            Buat catatan pertama
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition relative group"
            >
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap mb-4">
                {note.content}
              </p>

              {/* AREA TOMBOL AKSI */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                {/* Tombol Edit (Link ke halaman edit) */}
                <Link
                  to={`/edit/${note.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>

                {/* Tombol Delete */}
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
