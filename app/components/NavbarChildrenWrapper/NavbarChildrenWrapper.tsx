import Navbar from "../Navbar/Navbar";

export default function NavbarChildrenWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
