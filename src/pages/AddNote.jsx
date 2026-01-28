import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false); 

  const navigate = useNavigate();

  const handleAiGenerate = async () => {
    if (!content.trim()) return alert("Tulis dulu ide singkat di kolom isi!");

    setIsAiLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });

      const data = await res.json();

      if (res.ok) {
        setContent(data.result);
      } else {
        alert("Gagal: " + (data.error || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal terhubung ke server AI");
    } finally {
      setIsAiLoading(false);
    }
  };
  // --------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Isi Catatan
            </label>

            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isAiLoading || content.length === 0}
              className={`text-xs px-3 py-1 rounded-full transition border flex items-center gap-1
                ${
                  isAiLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300"
                }`}
            >
              {isAiLoading ? (
                <span>Sedang Berpikir...</span>
              ) : (
                <>✨ Minta AI Kembangkan</>
              )}
            </button>
            {/* ------------------------------------------------------- */}
          </div>

          <textarea
            required
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Tulis ide singkat di sini, lalu klik tombol AI..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isAiLoading}
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
