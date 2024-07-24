import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProfileProvider } from "./(components)/UserProfileContext";
import { ToastProvider } from "./(components)/ToastContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matthew Linktree | Share, Connect & Grow",
  description: "Created using Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <UserProfileProvider>{children} </UserProfileProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
