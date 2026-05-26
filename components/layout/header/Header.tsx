"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/integrations/sanity/sanity";

type HeaderProps = {
  navigation: any;
};

export default function Header({ navigation }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white text-black sticky top-0 z-50 border-b border-[#0000001a]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          {navigation?.logo ? (
            <Image
              src={urlFor(navigation.logo).url()}
              alt="Logo"
              width={170}
              height={52}
            />
          ) : (
            <span className="text-xl font-bold">Company Name</span>
          )}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {navigation?.menuItems?.map((item: any) => (
            <Link key={item.link} href={item.link}>
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Burger Button (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-[#0000001a]">
          {navigation?.menuItems?.map((item: any) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          {/* Mobile Buttons */}
          {navigation?.pentestButtonText && (
            <Link
              href={navigation?.pentestButtonLink}
              className="px-4 py-2 rounded-full uppercase bg-[#e9eef7] hover:bg-[#ccff00]"
              onClick={() => setOpen(false)}
            >
              {navigation?.pentestButtonText}
            </Link>
          )}

          {navigation?.buttonText && (
            <Link
              href={navigation?.buttonLink}
              className="px-4 py-2 rounded-full uppercase bg-[#ccff00] hover:bg-[#e9eef7]"
              onClick={() => setOpen(false)}
            >
              {navigation?.buttonText}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}