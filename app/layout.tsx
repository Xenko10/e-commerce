import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import { NavbarChildrenWrapper } from "./components/NavbarChildrenWrapper/NavbarChildrenWrapper";
import Footer from "./components/Footer/Footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.png' />
      </head>
      <body className={inter.className}>
        <Header />
        <NavbarChildrenWrapper >
            {children}
        </NavbarChildrenWrapper>
        <Footer />
      </body>
    </html>
  );
}
