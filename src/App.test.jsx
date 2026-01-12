import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders headline correctly', () => {
    render(<App />);
    // Cari teks "SecondBrain" (case insensitive /i)
    const headline = screen.getByText(/SecondBrain/i);
    expect(headline).toBeInTheDocument();
  });
});