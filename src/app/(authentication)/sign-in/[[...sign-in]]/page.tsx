import { Button } from "@/components/ui/button";
import { SignInWithMetamaskButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignInWithMetamaskButton>
        <Button>Connect Wallet</Button>
      </SignInWithMetamaskButton>
    </div>
  );
}
