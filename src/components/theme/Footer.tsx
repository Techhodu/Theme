import { MapPinnedIcon, ImageIcon } from "lucide-react";
import {
  SiFacebook,
  SiX,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import Link from "next/link";
import React from "react";
import logo from "../../assets/images/logo.png";

import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { ChevronRight } from "lucide-react";
import { getStaticPages } from "@/services";

type Props = {};

export async function Footer({}: Props) {
  const pagesData = await getStaticPages();
  const pages = pagesData.pages;

  return (
    <footer className="bg-muted py-8 text-muted-foreground sm:py-12">
      {/* <div className =" bg-background min-h-full h-4"></div> */}
      <div className="container max-w-full px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
           <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navigation</h4>
            <nav>
              <ul className="grid grid-cols-2 gap-2">
                {pages?.map((page: any, index: any) => (
                  <li
                    className="col-span-1 flex items-center text-base"
                    key={index}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/${page.slug}`} className="hover:underline">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div> 
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About</h4>
            <p className="text-sm leading-relaxed">
              Khabartaazgi News is a leading source of news and information,
              providing in-depth coverage of the latest events and trends.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <p className="text-sm leading-relaxed">
              support@techhodu.com
              <br />
              Phone: +91 7263025531
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61571234505115
"
                className="text-muted-foreground hover:text-foreground"
              >
                <SiFacebook color="default" size={24} className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/khabartaazgi
"
                className="text-muted-foreground hover:text-foreground"
              >
                <SiX color="default" size={24} className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/khabartaazgi/
"
                className="text-muted-foreground hover:text-foreground"
              >
                <SiInstagram color="default" size={24} className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@khabartaazgi
"
                className="text-muted-foreground hover:text-foreground"
              >
                <SiYoutube color="default" size={24} className="h-6" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-row justify-between border-t pt-4 text-sm text-muted-foreground">
          <p>
            &copy; 2024{" "}
            <Link href="https://techhodu.com/" className="text-primary">
              Techhodu.
            </Link>{" "}
            All rights reserved.
          </p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
