import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserPublicData = {
  actorType: string;
  recordId: string;
  registered: boolean;
};

async function getUserData(id: string) {
  "use server";
  const data = await prisma.actor.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}

export default async function Page() {
  const user = await currentUser();
  const metaData: UserPublicData = user?.publicMetadata as any;
  const userData = await getUserData(metaData.recordId);
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <Card className="w-full md:px-20 grow-1">
        <CardHeader>
          <CardTitle>{userData?.name}</CardTitle>
          <CardDescription>Your detilas.</CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Name: {userData?.name}</h1>
          <h1>Actor-Type: {userData?.actorType}</h1>
          <h1>Public key: {userData?.publicKey}</h1>
          <h1>Email: {userData?.email}</h1>
          <h1>Address: {userData?.address}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

{
  /* <div> */
}
{
  /*   <h1>{metaData.recordId}</h1> */
}
{
  /*   <h1>{metaData.registered}</h1> */
}
{
  /*   <h1>{metaData.actorType}</h1> */
}
{
  /*   <h1>Name: {userData?.name}</h1> */
}
{
  /*   <h1>Email: {userData?.email}</h1> */
}
{
  /*   <h1>Address: {userData?.address}</h1> */
}
{
  /*   <h1>PublicKey: {userData?.publicKey}</h1> */
}
{
  /*   <h1>Type: {userData?.actorType}</h1> */
}
{
  /* </div> */
}
