import { Package2 } from "lucide-react";
import Link from "next/link";

export default function NavList() {

  return <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {/* TODO: conditonaly render color based on active page */}
        <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/placed"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </Link>
        <Link
          href="/received"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Sales
        </Link>
        <Link
          href="/market"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Marketplace
        </Link>
      </nav>
}
