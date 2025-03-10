import "@/styles/globals.css";
import Sidebar from "@/components/ui/sidebar";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-hidden">
        <div className="h-1/2 w-full bg-black"></div>
      </div>
      {/* Main Layer */}
      <div className="absolute top-0 z-10 flex h-auto w-full">
        {/* Sidebar Layer */}
        <div className="fixed top-0 z-10 hidden h-full w-72 justify-center xl:relative xl:flex">
          <div className="fixed top-0 h-full w-64 py-2">
            <Sidebar locale={locale} />
          </div>
        </div>

        {/* Content Layer */}
        <div className="h-auto w-full px-2 py-2 md:px-4 xl:w-[calc(100%-288px)]">
          {children}
        </div>
      </div>
    </>
  );
}
