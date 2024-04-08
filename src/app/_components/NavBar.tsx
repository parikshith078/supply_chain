"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MetaMask from "../login/_component/metamask";


// TODO: Update Update avatar menu options href and discription
// TODO: Update logo

export default function NavBar() {
  // TODO: add userName fetch 
  const userName = "Shashank"
  const avatarUrl = `https://api.dicebear.com/8.x/identicon/svg?seed=${userName}`;
  return (
    <div className="flex justify-between mt-1 mb-6 items-center">
      <div>
        <Link className={navigationMenuTriggerStyle()} href="/">
          LOGO
        </Link>
      </div>
      {/* <AvatarMenu src={avatarUrl} /> */}
      <MetaMask />
    </div>
  );
}

const avatarMenuOptions: {
  title: string;
  href: string;
  description: string;
  style?: string;
}[] = [
  {
    title: "Profile",
    href: "",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Register",
    href: "",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "My shop",
    href: "",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Logout",
    href: "",
    description: "Bye",
    style:
      " text-red-500 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700",
  },
];

function AvatarMenu({ src }: { src: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Cart
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Avatar>
              <AvatarImage src={src} alt="Avatar" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[300px]">
              {avatarMenuOptions.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className={component.style ?? ""}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
