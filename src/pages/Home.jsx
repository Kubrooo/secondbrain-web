import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Helper Tanggal
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState(""); // State Search

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
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Ga bisa balik lagi loh!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE",
          });
          Swal.fire("Terhapus!", "Catatan hilang.", "success");
          fetchNotes();
        } catch (error) {
          Swal.fire("Error", "Gagal delete.", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Catatan Saya</h2>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Cari ide..."
          className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Jika Data Kosong */}
      {notes.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">Belum ada catatan.</p>
          <Link to="/add" className="text-blue-600 font-bold hover:underline">
            Buat baru yuk!
          </Link>
        </div>
      ) : (
        /* DAFTAR CATATAN (DIFILTER) */
        <div className="grid gap-4">
          {notes
            .filter((note) => {
              const search = keyword.toLowerCase();
              return (
                note.title.toLowerCase().includes(search) ||
                note.content.toLowerCase().includes(search)
              );
            })
            .map((note) => (
              <div
                key={note.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition relative"
              >
                <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                <p className="text-gray-600 whitespace-pre-wrap mb-4 line-clamp-3">
                  {note.content}
                </p>

                {/* TANGGAL CANTIK */}
                <p className="text-xs text-gray-400 mb-4 font-mono">
                  {formatDate(note.createdAt)}
                </p>

                <div className="flex gap-2 border-t pt-4 border-gray-100">
                  <Link
                    to={`/edit/${note.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          {/* Pesan jika hasil pencarian nihil */}
          {notes.filter((n) =>
            n.title.toLowerCase().includes(keyword.toLowerCase())
          ).length === 0 &&
            keyword !== "" && (
              <p className="text-center text-gray-500 mt-4">
                Tidak ditemukan catatan dengan kata kunci "{keyword}"
              </p>
            )}
        </div>
      )}
    </div>
  );
}
