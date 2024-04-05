import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import { adminAuth } from "@/db/pocketbase";

export default async function Home() {
  const data = await adminAuth()

  console.log(data)

  return (
    <div>
      <Nav/>
    </div>
  );
}
