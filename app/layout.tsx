import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sebuah Surat untuk Suci Dwi Melati",
  description: "Ada sesuatu yang ingin aku sampaikan...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f3e5f5 100%)" }}>
        {children}
      </body>
    </html>
  );
}
