import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { Link } from "@/navigation";
import WhatsappIcon from "@/icons/whatsappIcon";
import CallCenter from "@/icons/callcenter";
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

      <main className="w-full px-4 mt-[64px] md:mt-[68px] md:p-0">
        {children}
      </main>

      <div className="fixed top-[300px] right-4  flex-col space-y-4 z-50 hidden md:flex">
        <Link
          target="_blank"
          rel="noopener"
          href={"tel:02167062122" as any}
          className="w-full flex justify-start md:justify-center"
        >
          <button className="bg-[#7626FF] text-white p-3 rounded-full shadow-lg hover:bg-[#7626FF]">
            <CallCenter />
          </button>
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href={"https://api.whatsapp.com/send?phone=905385921578" as any}
          className="w-full flex justify-end md:justify-center"
        >
          <button className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#25D366]">
            <WhatsappIcon />
          </button>
        </Link>
      </div>

      <div className="top-[300px] right-[-40px]  flex-col space-y-4 z-50 fixed flex md:hidden">
        <Link
          target="_blank"
          rel="noopener"
          href={"https://api.whatsapp.com/send?phone=905385921578" as any}
          className="w-full flex justify-end md:justify-center"
        >
          <button className="bg-[#25D366] text-white p-[8px] rotate-[270deg] shadow-lg hover:bg-[#25D366] rounded-tl-lg rounded-tr-lg">
            <span className="text-xs font-medium">Whatsapp Destek</span>
          </button>
        </Link>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
