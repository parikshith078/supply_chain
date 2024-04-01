import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import { getData } from "@/db/pocketbase";

export default async function Home() {
  const data = await getData()

  async function handleClick() {
    await getData()
  }


  return (
    <div>
      <Nav/>
    </div>
  );
}
