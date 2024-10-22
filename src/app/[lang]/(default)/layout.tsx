import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="max-w-5xl mt-[64px] mx-auto px-4">{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
