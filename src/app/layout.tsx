"use client";

import { ThirdwebProvider } from "thirdweb/react";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider>
      <html>
        <body className="bg-[#111115]">{children}</body>
      </html>
    </ThirdwebProvider>
  );
}
