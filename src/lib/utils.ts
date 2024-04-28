import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertWeiToEth(balanceInWeiString: string): string {
    const balanceInWei = BigInt(balanceInWeiString);
    const balanceInEth = (Number(balanceInWei) / 1e18).toFixed(3);
    return balanceInEth;
}
