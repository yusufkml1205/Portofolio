import Logo from "../logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="navbar top-0 left-0 z-999 w-full absolute">
      <div className="container">
        <nav className="py-7">
          <div className="flex items-center gap-4 sm:gap-8">
            <div>
              <Logo />
            </div>

            {/* Simple Link - tidak ada onClick */}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-fit py-2 sm:py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group hover:bg-primary transition-colors duration-300"
            >
              <span className="text-xl font-medium text-black group-hover:text-white transition-colors duration-300">
                Download PDF Resume
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
