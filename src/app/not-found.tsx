export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-destructive mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Halaman tidak ditemukan.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
