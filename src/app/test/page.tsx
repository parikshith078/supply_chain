import { getFakeData } from "@/lib/tracking";

export default async function page() {
  const data = await getFakeData()
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
