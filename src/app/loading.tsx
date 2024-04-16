import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="flex min-h-screen w-full flex-col mx-auto gap-10">
    <Skeleton className="h-16 w-full rounded-xl" />
    <Skeleton className="h-screen w-full rounded-xl" />
  </div>
}
