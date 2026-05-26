import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/integrations/sanity/sanity";

type HeaderProps = {
  navigation: any;
};

export default function Header({ navigation }: HeaderProps) {
  return (
    <header className="bg-white text-black sticky top-0 z-50 border-b border-[#0000001a]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          {navigation?.logo ?  (
            <Image
            src={urlFor(navigation.logo).url()} 
            alt="Logo"
            width={170}
            height={52}
            />
        ): (
          <span className="text-xl font-bold">
            Company Name
          </span>
        )}
        </Link>

        {/* Menu */}
        <nav className="flex gap-6">
          {navigation?.menuItems?.map((item) => (
            <Link
              key={item.link}
              href={item.link}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            {navigation?.pentestButtonText && (
            <Link
                href={navigation?.pentestButtonLink}
                className="px-4 py-2 rounded-full uppercase bg-[#e9eef7] hover:bg-[#ccff00]"
            >
                {navigation?.pentestButtonText}
            </Link>
            )}
            {navigation?.buttonText && (
            <Link
                href={navigation?.buttonLink}
                className="px-4 py-2 rounded-full uppercase bg-[#ccff00] hover:bg-[#e9eef7]"
            >
                {navigation?.buttonText}
            </Link>
            )}
        </div>

      </div>
      
    </header>
  );
}