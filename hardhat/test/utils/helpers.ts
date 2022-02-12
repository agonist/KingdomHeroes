import { ethers } from "hardhat";
import { BigNumber } from "ethers";

export const parseCoin = ethers.utils.parseEther;
export const formatCoin = ethers.utils.formatEther;

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export async function setBalance(address: string, amount: BigNumber) {
  const params = [address, amount.toHexString()];
  await ethers.provider.send("hardhat_setBalance", params);
}
