"use client";

import { usePathname } from "next/navigation";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function LayoutContent({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation: any;
  footer: any;
}) {
  const pathname = usePathname();

  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Header navigation={navigation} />}

      <main>{children}</main>

      {!isStudio && <Footer footer={footer} />}
    </>
  );
}