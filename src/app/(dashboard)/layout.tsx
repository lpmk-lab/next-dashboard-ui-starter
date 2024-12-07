import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="w-[14%] lg:w-[16%] md:w-[8%] xl:w-[14%] p-4 ">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32}></Image>
          <span className="hidden lg:block font-bold">Famous </span>{" "}
        </Link>
        <Menu />
      </div>
      {/* right */}
      <div className="w-[86%] lg:w-[84%] md:w-[92%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
