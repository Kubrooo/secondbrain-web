import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; // Kita butuh ini karena ada <Link>
import Home from './Home';

// Kita buat data palsu (Mock Data)
const mockNotes = [
  { id: 1, title: 'Catatan Test 1', content: 'Isi test 1' },
  { id: 2, title: 'Catatan Test 2', content: 'Isi test 2' },
];

describe('Halaman Home', () => {
  // Sebelum setiap test, reset semua mock biar bersih
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('seharusnya menampilkan loading saat awal dibuka', () => {
    // Mock fetch biar dia nge-gantung (tidak pernah selesai)
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  it('seharusnya menampilkan data catatan setelah fetch berhasil', async () => {
    // 1. Mock fetch supaya mengembalikan data palsu kita
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNotes,
    });

    // 2. Render halaman
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // 3. Tunggu sampai tulisan "Loading" hilang dan data muncul
    // waitFor berguna untuk menunggu proses async (useEffect) selesai
    await waitFor(() => {
        expect(screen.getByText('Catatan Test 1')).toBeInTheDocument();
        expect(screen.getByText('Catatan Test 2')).toBeInTheDocument();
    });
  });

  it('seharusnya menampilkan pesan jika data kosong', async () => {
    // 1. Mock fetch supaya mengembalikan array kosong []
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Belum ada catatan/i)).toBeInTheDocument();
    });
  });
});