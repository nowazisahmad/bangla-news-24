import Image from "next/image";
import NavLinks from "./NavLinks";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm relative">
      <div className="px-2 py-2 w-full relative">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            width={45}
            height={45}
            priority
            className="rounded"
          />
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl font-bold text-red-700 leading-tight">
              Bangla News 24
            </span>
            <span className="text-xs text-neutral-500">{date}</span>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-sm">
          <button className="btn text-gray-700 hover:text-red-700 transition-colors font-medium">
            সাইন ইন
          </button>
          <button className="btn bg-red-700 px-4 py-1.5 rounded text-white font-semibold hover:bg-red-800 transition-colors">
            সাইন আপ
          </button>
        </div>
      </div>
      <div>
        <NavLinks />
      </div>
    </header>

  );
};

export default Header;