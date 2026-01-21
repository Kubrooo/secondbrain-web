import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Untuk pindah halaman otomatis

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman standar HTML
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (response.ok) {
        // Jika sukses, kembali ke Home
        navigate("/");
      }
    } catch (error) {
      alert("Gagal menyimpan catatan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tambah Catatan Baru</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm max-w-2xl"
      >
        {/* Input Judul */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Contoh: Belajar React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Input Isi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Isi Catatan
          </label>
          <textarea
            required
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Tulis ide kamu di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Catatan"}
        </button>
      </form>
    </div>
  );
}
