import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo/logo.png"
        alt="logo"
        width={40}
        height={70}
        quality={100}
        className="w-10 h-auto"
      />
      <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
        Indo Caris International
      </span>
    </Link>
  );
};

export default Logo;
