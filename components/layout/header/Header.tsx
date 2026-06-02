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
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

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
        <nav className="hidden md:flex gap-6 items-center">
          {navigation?.menuItems?.map((item: any, index: number) => (
            <div key={index} className="relative group">

              {/* Normal Link */}
              {!item.children?.length ? (
                <Link href={item.link}>
                  {item.title}
                </Link>
              ) : (

                /* Dropdown Parent */
                <div className="flex items-center gap-1 cursor-pointer group">
                  <span>{item.title}</span>

                    {item.children?.length > 0 && (
                      <span className="text-md transition-transform group-hover:rotate-180">
                        ▾
                      </span>
                    )}

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg min-w-[200px] py-2 border border-[#0000001a]">
                    {item.children.map((child: any, childIndex: number) => (
                      <Link
                        key={childIndex}
                        href={child.link}
                        className="px-4 py-2 hover:bg-[#f5f5f5]"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
          {navigation?.menuItems?.map((item: any, index: number) => (
            <div key={index} className="border-b border-[#00000010] py-2">

              {/* Normal Link */}
              {!item.children?.length ? (
                <Link
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  {/* Parent Button */}
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === index ? null : index)
                    }
                    className="w-full flex items-center justify-between"
                  >
                    <span>{item.title}</span>
                    <span>
                      {activeMenu === index ? "-" : "+"}
                    </span>
                  </button>

                  {/* Submenu */}
                  {activeMenu === index && (
                    <div className="ml-4 mt-3 flex flex-col gap-3">
                      {item.children.map((child: any, childIndex: number) => (
                        <Link
                          key={childIndex}
                          href={child.link}
                          onClick={() => setOpen(false)}
                          className="text-sm text-gray-600"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
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