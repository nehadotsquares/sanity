import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";
import { client, urlFor } from "@/lib/integrations/sanity/sanity";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import LayoutContent from "@/components/layout/LayoutContent";
export const metadata: Metadata = {
	title: "My Blog",
	description: "Modern Blog Website",
};

export async function getNavigation() {
	return client.fetch(`
    *[_type == "navigation"][0]{
      logo,
      menuItems,
      pentestButtonText,
      pentestButtonLink,
      buttonText,
      buttonLink
    }
  `);
}

export async function getFooter() {
	return client.fetch(`
    *[_type == "footer"][0]{
      logo,
      footerImage,

      siteMapMenu->{
        title,
        menuItems
      },

      legalMenu->{
        title,
        menuItems
      },

      connectMenu->{
        title,
        menuItems
      }
    }
  `);
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigation = await getNavigation();
	const footer = await getFooter();
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-900">
				<Toaster position="top-right" />
				{/* Header */}
				{/* <Header navigation={navigation} /> */}

				{/* Main Content */}
				{/* <main>{children}</main> */}

				{/* Footer */}
				{/* <Footer footer={footer} /> */}

        <LayoutContent
          navigation={navigation}
          footer={footer}
        >
          {children}
        </LayoutContent>
			</body>
		</html>
	);
}
