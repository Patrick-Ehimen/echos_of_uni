import { ethers } from "ethers";
import { SWAP_ROUTER_CONTRACT_ADDRESS } from "../../config/tokens";

/**
 * @notice Approves a specified amount of ERC-20 tokens for the swap router contract to spend on behalf of the wallet.
 * @dev Uses the ERC-20 `approve` function to grant allowance to the swap router contract.
 * @param tokenAddress The address of the ERC-20 token contract.
 * @param tokenABI The ABI of the ERC-20 token contract.
 * @param amount The amount of tokens to approve (as a bigint).
 * @param wallet The ethers.js Wallet instance used to sign and send the transaction.
 * @returns {Promise<void>} Resolves when the approval transaction is confirmed.
 * @throws Will throw an error if the approval transaction fails.
 * @custom:natspec Emits transaction hash and confirmation status to the console.
 */
export async function approveToken(
  tokenAddress: string,
  tokenABI: any,
  amount: bigint,
  wallet: ethers.Wallet
) {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
    const approveTx = await tokenContract.approve.populateTransaction(
      SWAP_ROUTER_CONTRACT_ADDRESS,
      amount
    );
    const txResponse = await wallet.sendTransaction(approveTx);
    console.log(`-------------------------------`);
    console.log(`Sending Approval Transaction...`);
    console.log(`Transaction Sent: ${txResponse.hash}`);
    const receipt = await txResponse.wait();
    if (receipt && receipt.hash) {
      console.log(
        `Approval Transaction Confirmed! https://sepolia.etherscan.io/txn/${receipt.hash}`
      );
    } else {
      console.log(
        "Approval Transaction Confirmed, but receipt or hash is null."
      );
    }
  } catch (error) {
    console.error("An error occurred during token approval:", error);
    throw new Error("Token approval failed");
  }
}
