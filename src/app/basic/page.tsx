export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#111115] flex flex-col items-center justify-center">
        <header className="w-full h-[90px] border-b border-[#29292F] flex items-center justify-center">
          <nav className="container">
            <p className="text-[#F8F8FF] text-[42px] font-semibold">Demo</p>
          </nav>
        </header>
        <main className="container flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
