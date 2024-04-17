import { ActorTypeOptions } from "@/db/pocketbase-type";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItemType = {
  label: string;
  href: string;
};

const farmerNav: NavItemType[] = [
  {
    label: "Inventory",
    href: "/inventory",
  },
  {
    label: "Sales",
    href: "/received",
  },
];

const distributorAndProcessorNav: NavItemType[] = [
  {
    label: "Inventory",
    href: "/inventory",
  },
  {
    label: "Orders",
    href: "/placed",
  },
  {
    label: "Sales",
    href: "/received",
  },
  {
    label: "Marketplace",
    href: "/market",
  },
];

const retailerNav: NavItemType[] = [
  {
    label: "Orders",
    href: "/placed",
  },
  {
    label: "Marketplace",
    href: "/market",
  },
];
export function NavList({ actorType }: { actorType: ActorTypeOptions }) {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <UtensilsCrossed className="h-6 w-6" />
        <span className="sr-only">Toggle navigation menu</span>
      </Link>
      {/* TODO: conditonaly render color based on active page */}
      <Link
        href="/"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      {actorType == ActorTypeOptions.farmer && (
        <NavItemsList
          styles="text-muted-foreground transition-colors hover:text-foreground"
          navList={farmerNav}
        />
      )}

      {actorType == ActorTypeOptions.retailer && (
        <NavItemsList
          styles="text-muted-foreground transition-colors hover:text-foreground"
          navList={retailerNav}
        />
      )}

      {actorType == ActorTypeOptions.distributor ||
        (actorType == ActorTypeOptions.processor && (
          <NavItemsList
            styles="text-muted-foreground transition-colors hover:text-foreground"
            navList={distributorAndProcessorNav}
          />
        ))}
    </nav>
  );
}

export function MobilNavList({ actorType }: { actorType: ActorTypeOptions }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="sr-only">Farm to Fork</span>
          </Link>
          <Link href="#" className="hover:text-foreground">
            Dashboard
          </Link>
          {actorType == ActorTypeOptions.farmer && (
            <NavItemsList
              styles="text-muted-foreground hover:text-foreground"
              navList={farmerNav}
            />
          )}

          {actorType == ActorTypeOptions.retailer && (
            <NavItemsList
              styles="text-muted-foreground hover:text-foreground"
              navList={retailerNav}
            />
          )}

          {actorType == ActorTypeOptions.distributor ||
            (actorType == ActorTypeOptions.processor && (
              <NavItemsList
                styles="text-muted-foreground hover:text-foreground"
                navList={distributorAndProcessorNav}
              />
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function NavItemsList({
  navList,
  styles,
}: {
  navList: NavItemType[];
  styles: string;
}) {
  return (
    <>
      {navList.map((item, ind) => (
        <Link key={ind} href={item?.href as string} className={styles}>
          {item?.label}
        </Link>
      ))}
    </>
  );
}
