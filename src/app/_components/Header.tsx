"use client";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavList, MobilNavList } from "./NavList";
import {
  SignInWithMetamaskButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { ActorTypeOptions } from "@/db/pocketbase-type";

export default function Header() {
  // type UserPublicData = {
  //   actorType: ActorTypeOptions;
  //   recordId: string;
  //   registered: boolean;
  // };
  const { user } = useUser();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <NavList actorType={user?.publicMetadata.actorType as ActorTypeOptions} />
      <MobilNavList
        actorType={user?.publicMetadata.actorType as ActorTypeOptions}
      />
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SignedIn>
          {user?.publicMetadata.registered ? (
            <UserDropdownMenu />
          ) : (
            <Button>
              <Link href="/register">Register </Link>
            </Button>
          )}
        </SignedIn>
        <SignedOut>
          <SignInWithMetamaskButton>
            <Button>Connect Wallet</Button>
          </SignInWithMetamaskButton>
        </SignedOut>
      </div>
    </header>
  );
}

function UserDropdownMenu() {
  return (
    <DropdownMenu>
      {/* TODO: Update dropdown menu options */}
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
