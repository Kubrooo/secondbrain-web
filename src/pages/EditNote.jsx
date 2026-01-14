import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Catatan tidak ditemukan");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        // Tampilkan Sukses dulu, baru pindah halaman
        Swal.fire({
          title: "Berhasil!",
          text: "Catatan sudah diupdate.",
          icon: "success",
          confirmButtonColor: "#000000",
        }).then(() => {
          navigate("/");
        });
      } else {
        alert("Gagal mengupdate catatan");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Mengambil data...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Catatan</h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Isi Catatan
          </label>
          <textarea
            required
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
