import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="Indo Caris International - IT Consultant Jakarta Logo"
        width={100}
        height={130}
        className="w-10 h-auto"
      />
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black text-white tracking-tighter italic">CARIS</span>
        <span className="text-[8px] font-bold text-white/50 tracking-[0.3em] -mt-0.5">INTERNATIONAL</span>
      </div>
    </Link>
  );
};

export default Logo;
