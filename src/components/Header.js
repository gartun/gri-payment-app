import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { RiBillLine } from "react-icons/ri";

// we are creating a custom React Component, this way
// we can provide our nav links with some common styles
const HeaderLink = ({ url, children, className = "" }) => {
  return (
    <Link
      to={url}
      className={`px-2 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:text-red-500${className}`}
    >
      <p className="flex items-center">{children}</p>
    </Link>
  );
};

const Header = () => {
  return (
    <header className="bg-blue-200">
      <div className="container flex justify-between py-2">
        <h1>GriTahsilat</h1>
        <div className="flex divide-x divide-gray-400">
          <HeaderLink url="/profile">
            <BiUser /> <span>Profilim</span>
          </HeaderLink>

          <HeaderLink url="/orders">
            <RiBillLine /> <span>Faturalarım</span>
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
