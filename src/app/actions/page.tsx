import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default function AddToCart() {
  async function addItem(formData: FormData) {
    "use server";
    const user = await currentUser();
    const { userId } = auth();
    if (!userId) {
      throw new Error("You must be signed in to add an item to your cart");
    }
    console.log("user: ", user?.web3Wallets[0].web3Wallet);
    console.log("add item server action", formData);
  }

  return (
    <form action={addItem}>
      <input value={"test"} type="text" name="name" />
      <button type="submit">Add to Cart</button>
    </form>
  );
}
