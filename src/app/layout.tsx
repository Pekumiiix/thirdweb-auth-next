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
        <body>{children}</body>
      </html>
    </ThirdwebProvider>
  );
}
