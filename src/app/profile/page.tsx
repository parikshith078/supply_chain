import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";
import {
  Card,
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

export default async function ProfilePage() {
  const user = await currentUser();
  const metaData: UserPublicData = user?.publicMetadata as any;
  const userData = await getUserData(metaData.recordId);

  return (
    <div className=" ">
      <Card className="flex mt-20  rounded-lg flex-col items-center  w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-2xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            PROFILE INFORMATION
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
            {userData?.name}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">ActorType</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {userData?.actorType}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
            {userData?.email}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {userData?.address}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">PublicKey</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
            {userData?.publicKey}
            </p>
          </div>

        </div>
      </Card>
    </div>
  );
}

