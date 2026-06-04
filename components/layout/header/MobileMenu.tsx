"use client";

import Link from "next/link";
import { useState } from "react";
import { useMenuStore } from "@/store/useMenuStore";

type Props = {
  navigation: any;
};

export default function MobileMenu({
  navigation,
}: Props) {
  const [activeMenu, setActiveMenu] =
    useState<number | null>(null);

  const open = useMenuStore(
    (state) => state.open
  );

  const setOpen = useMenuStore(
    (state) => state.setOpen
  );

  if (!open) return null;

  return (
    <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-[#0000001a]">
      {navigation?.menuItems?.map(
        (item: any, index: number) => (
          <div
            key={index}
            className="border-b border-[#00000010] py-2"
          >
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
                <button
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === index
                        ? null
                        : index
                    )
                  }
                  className="w-full flex items-center justify-between"
                >
                  <span>{item.title}</span>

                  <span>
                    {activeMenu === index
                      ? "-"
                      : "+"}
                  </span>
                </button>

                {activeMenu === index && (
                  <div className="ml-4 mt-3 flex flex-col gap-3">
                    {item.children.map(
                      (
                        child: any,
                        childIndex: number
                      ) => (
                        <Link
                          key={childIndex}
                          href={child.link}
                          onClick={() =>
                            setOpen(false)
                          }
                          className="text-sm text-gray-600"
                        >
                          {child.title}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )
      )}

      {navigation?.pentestButtonText && (
        <Link
          href={navigation.pentestButtonLink}
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-full uppercase bg-[#e9eef7]"
        >
          {navigation.pentestButtonText}
        </Link>
      )}

      {navigation?.buttonText && (
        <Link
          href={navigation.buttonLink}
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-full uppercase bg-[#ccff00]"
        >
          {navigation.buttonText}
        </Link>
      )}
    </div>
  );
}