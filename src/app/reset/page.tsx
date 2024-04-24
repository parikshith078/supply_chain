"use client";
import { deleteAllProducts, deleteAllUsers } from "@/actions/createListing";
import { Button } from "@/components/ui/button";

async function handelClick() {
  if (window.confirm("It will delete all products.")) {
    await deleteAllProducts();
  }
}

async function handelClick2() {
  if (window.confirm("It will delete all products.")) {
    await deleteAllUsers();
  }
}
export default function Page() {
  return (
    <div className="w-full h-full py-10 flex gap-10 flex-col justify-center items-center">
      <Button onClick={handelClick}>Delete all products</Button>
      <Button onClick={handelClick2}>Delete all user</Button>
    </div>
  );
}
