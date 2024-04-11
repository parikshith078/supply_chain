
import Link from "next/link";
import {
  SignInWithMetamaskButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";


// TODO: Update Update avatar menu options href and discription
// TODO: Update logo

export default function NavBar() {

  // const avatarUrl = `https://api.dicebear.com/8.x/identicon/svg?seed=${userName}`;
  return (
    <div className="flex mx-5 justify-between mt-1 mb-6 items-center">
      <div>
        <Link className={` text-xl`} href="/">
          Farm to Fork
        </Link>
      </div>
      <SignedIn>
        <SignOutButton>
          <Button variant="outline">Disconnect</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInWithMetamaskButton>
          <Button>Connect Wallet</Button>
        </SignInWithMetamaskButton>
      </SignedOut>
    </div>
  );
}

