import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Indo Caris International Logo"
          width={40}
          height={40}
          className="w-full h-auto brightness-0 invert transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black text-white tracking-tighter italic group-hover:text-accent transition-colors">CARIS</span>
        <span className="text-[8px] font-bold text-white/40 tracking-[0.3em] -mt-0.5">INTERNATIONAL</span>
      </div>
    </Link>
  );
};

export default Logo;
