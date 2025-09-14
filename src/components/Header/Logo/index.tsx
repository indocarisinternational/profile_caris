import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="logo"
        width={100}
        height={130}
        className="w-10 h-auto"
      />
      {/* <div className="flex flex-col leading-tight">
        <span className="text-lg font-semibold text-gray-800">Indo</span>
        <span className="text-lg font-semibold text-gray-800">Caris</span>
        <span className="text-lg font-semibold text-gray-800">
          International
        </span>
      </div> */}
    </Link>
  );
};

export default Logo;
