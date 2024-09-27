import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Menu, Search } from "lucide-react";
import logo from "../../assets/images/logo.png";
import logo1 from "../../assets/images/logo1.png";
import img from "../../assets/images/img.jpg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { getCategories, getSubCategories } from "@/services";

type Props = {};

export async function Header({}: Props) {
  // Fetch categories and subcategories
  const categoriesData = await getCategories();
  const categories = categoriesData.categories;

  const subCategoriesData = await getSubCategories();
  const subCategories = subCategoriesData.subCategories;

  // Initialize a map to hold categories with their subcategories
  const categoriesMap = new Map();

  // Populate the categories map with empty arrays for subcategories
  categories?.forEach((category: any) => {
    categoriesMap.set(category._id, {
      ...category,
      subCategories: [], // Initialize subCategories array
    });
  });

  // Iterate over subcategories and add them to the corresponding category
  subCategories?.forEach((subCategory: any) => {
    const categoryId = subCategory.category;
    if (categoriesMap.has(categoryId)) {
      const category = categoriesMap.get(categoryId);
      category.subCategories.push(subCategory);
    }
  });

  // Convert the map back to an array if needed
  const categoriesWithSubCat: any[] = Array.from(categoriesMap.values());

  const filteredCategories: any[] = categoriesWithSubCat.filter(
    (category) =>
      category.visibility === "both" || category.visibility === "mainMenu",
  );

  // Sort the filtered categories by homeHierarchy in increasing order
  const sortedCategories: any[] = filteredCategories.sort(
    (a, b) => a.menuHierarchy - b.menuHierarchy,
  );

  return (
    <header className="z-10 flex items-center justify-between gap-3 border-b bg-background px-4 py-3 md:px-6">
      <div className="flex items-center gap-4">
        <Link href={`/`} className="text-lg font-bold">
          <Image
            className="h-12 w-44 object-contain"
            width={180}
            height={60}
            src={logo}
            alt="alt"
          ></Image>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          <ul id="side-menu" className="float-none flex w-full flex-row gap-1">
            <li className="relative">
              <Link
                href={`/`}
                className="block px-5 py-2 text-muted-foreground hover:bg-muted/85 hover:text-foreground"
              >
                Home
              </Link>
            </li>
            {sortedCategories.map((category: any, index: number) => {
              // Your code to handle each category
              if (index >= 6) {
                return;
              }
              return category.subCategories.length <= 0 ? (
                <li className="relative" key={index}>
                  <Link
                    href={`/${category.slug}`}
                    className="block px-5 py-2 text-muted-foreground hover:bg-muted/85 hover:text-foreground"
                  >
                    {category.title}
                  </Link>
                </li>
              ) : (
                <li className="dropdown group relative" key={index}>
                  <div className="flex flex-row items-center justify-between text-muted-foreground hover:bg-muted/85 group-hover:text-foreground">
                    <Link
                      className="block w-full px-5 py-2"
                      href={`/${category.slug}`}
                    >
                      {category.title}
                    </Link>
                    <ChevronUp className="hidden group-hover:block" />
                    <ChevronDown className="block group-hover:hidden" />
                  </div>

                  <ul
                    className="dropdown-menu absolute top-full z-50 mb-4 ml-4 hidden rounded rounded-t-none bg-white py-0.5 text-left group-hover:block dark:bg-gray-800"
                    // style="min-width: 12rem"
                  >
                    {category.subCategories.map(
                      (subCategory: any, subIndex: any) => (
                        <li
                          className="subdropdown relative w-full"
                          key={subIndex}
                        >
                          <Link
                            className="block whitespace-nowrap border-b border-muted px-5 py-2 text-muted-foreground hover:bg-muted/85 hover:text-foreground"
                            href={`/${category.title}/${subCategory.slug}`}
                          >
                            {subCategory.title} {/* Adjust this as needed */}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="relative max-w-md flex-1">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="search"
          placeholder="Search news..."
          className="w-full rounded-md bg-muted pl-8 text-muted-foreground"
        />
      </div>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Welcome to  Khabartaazgi</SheetTitle>
            <ul id="side-menu" className="float-none flex w-full flex-col">
              <li className="relative">
                <Link
                  href={`/`}
                  className="block border-b border-muted px-5 py-2 hover:bg-muted/85"
                >
                  Home
                </Link>
              </li>
              {sortedCategories.map((category: any, index: number) => {
                // Your code to handle each category

                return category.subCategories.length <= 0 ? (
                  <li className="relative" key={index}>
                    <Link
                      href={`/${category.slug}`}
                      className="block border-b border-muted px-5 py-2 hover:bg-muted/85"
                    >
                      {category.title}
                    </Link>
                  </li>
                ) : (
                  <li className="dropdown group relative" key={index}>
                    <div className="flex flex-row items-center justify-between">
                      <Link
                        className="block w-full border-b border-muted px-5 py-2 hover:bg-muted/85"
                        href={`/${category.slug}`}
                      >
                        {category.title}
                      </Link>
                      <ChevronUp className="hidden group-hover:block" />
                      <ChevronDown className="block group-hover:hidden" />
                    </div>

                    <ul
                      className="dropdown-menu top-full z-50 mb-4 ml-4 hidden rounded rounded-t-none py-0.5 text-left group-hover:block"
                      // style="min-width: 12rem"
                    >
                      {category?.subCategories.map(
                        (subCategory: any, subIndex: any) => (
                          <li className="subdropdown relative" key={subIndex}>
                            <Link
                              className="block w-full border-b border-muted px-5 py-2 hover:bg-muted/85"
                              href={`/${category.title}/${subCategory.slug}`}
                            >
                              {subCategory.title}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <SheetDescription>
              This menu is catain section and subsection
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
