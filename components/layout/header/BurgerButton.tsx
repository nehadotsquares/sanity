"use client";

import { useMenuStore } from "@/store/useMenuStore";

export default function BurgerButton() {
  const toggleOpen = useMenuStore(
    (state) => state.toggleOpen
  );

  return (
    <button
      className="md:hidden text-2xl"
      onClick={toggleOpen}
    >
      ☰
    </button>
  );
}