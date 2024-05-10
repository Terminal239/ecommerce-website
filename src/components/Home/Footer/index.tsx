import { Link } from "react-router-dom";
import MaxWidthWrapper from "../../Resuable/MaxWidthWrapper";

const index = () => {
  return (
    <footer className="bg-gray-200 px-8 py-6">
      <MaxWidthWrapper className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <h1 className="title text-base tracking-widest lg:text-lg">
          <Link to="/" preventScrollReset={false}>
            MODERN ESSENTIALS
          </Link>
        </h1>
        <nav className="flex items-center gap-6 text-[14px] lg:gap-12">
          <a className="hover:underline" href="#">
            Home
          </a>
          <a className="hover:underline" href="#">
            About
          </a>
          <a className="hover:underline" href="#">
            Contact
          </a>
        </nav>
        <p className="text-[12px] lg:text-[14px]">© 2024 Modern Essentials. All rights reserved.</p>
      </MaxWidthWrapper>
    </footer>
  );
};

export default index;
