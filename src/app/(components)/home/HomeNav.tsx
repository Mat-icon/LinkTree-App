import Link from "next/link";

const HomeNavbar: React.FC = () => {
  return (
    <div className="w-full relative z-10 h-14 flex items-center justify-between md:rounded-lg p-5 bg-white instrument-sans">
      <div className="">
        <Link
          href="/editor"
          className="link-color text-xs p-3 px-6 rounded-md preview font-semibold"
        >
          Back to Editor
        </Link>
      </div>

      <div className="">
        <button className="btn text-white text-xs p-3 px-6 rounded-md preview font-semibold">
          Share Link
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
