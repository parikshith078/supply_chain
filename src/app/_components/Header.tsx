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
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { prisma } from "@/db/client";
import { useRouter } from "next/navigation";
import { deRegister } from "@/actions/register";

export default function Header() {
  // type UserPublicData = {
  //   actorType: ActorTypeOptions;
  //   recordId: string;
  //   registered: boolean;
  // };
  const { user } = useUser();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <NavList actorType={user?.publicMetadata.actorType as any} />
      <MobilNavList actorType={user?.publicMetadata.actorType as any} />
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SignedIn>
          {user?.publicMetadata.registered ? (
            <UserDropdownMenu user={user as any} />
          ) : (
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          )}
        </SignedIn>
        <SignedOut>
          <SignInWithMetamaskButton>
            {/* TODO: show error toast if no metamask  */}
            <Button>Connect Wallet</Button>
          </SignInWithMetamaskButton>
        </SignedOut>
      </div>
    </header>
  );
}

function UserDropdownMenu({
  user,
}: {
  user: { publicMetadata: { recordId: string; registered: boolean } };
}) {
  const { signOut } = useClerk();
  const router = useRouter();
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
        <DropdownMenuItem asChild>
          <Button
            onClick={async () => {
              await deRegister(user.publicMetadata.recordId)
              signOut().then(() => {
                router.push("/");
                router.refresh();
              });
            }}
            variant="destructive"
          >
            Deregister
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
