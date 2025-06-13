import { ethers } from "ethers";

import SWAP_ROUTER_ABI from "../../abi/swaprouter.json" assert { type: "json" };
import TOKEN_IN_ABI from "../../abi/weth.json" assert { type: "json" };
import "dotenv/config";
import { SWAP_ROUTER_CONTRACT_ADDRESS } from "../../config/tokens";
import { approveToken } from "./approve-token";
import { getPoolInfo } from "./getPoolInfo";
import { quoteAndLogSwap } from "./quoteAndLogSwap";
import { prepareSwapParams } from "./prepareSwapParams";
import { WETH, USDC } from "../../config/tokens";
import { factoryContract, quoterContract, signer } from "../../utils/utils";

/**
 * @notice Executes a token swap using the provided swap router contract and signer.
 * @dev This function populates a transaction for `exactInputSingle` on the swap router,
 *      sends it using the provided signer, and logs the transaction receipt URL.
 * @param swapRouter The ethers.js Contract instance of the swap router.
 * @param params The parameters for the `exactInputSingle` swap function.
 * @param signer The ethers.js Wallet instance used to sign and send the transaction.
 * @returns {Promise<void>} A promise that resolves when the transaction is sent and the receipt is logged.
 */
async function executeSwap(
  swapRouter: ethers.Contract,
  params: any,
  signer: ethers.Wallet
) {
  const transaction = await swapRouter.exactInputSingle.populateTransaction(
    params
  );
  const receipt = await signer.sendTransaction(transaction);
  console.log(`-------------------------------`);
  console.log(`Receipt: https://sepolia.etherscan.io/tx/${receipt.hash}`);
  console.log(`-------------------------------`);
}

/**
 * @notice Executes a token swap from WETH to USDC using Uniswap V3 contracts.
 * @dev This function approves the input token, fetches pool info, quotes the output amount,
 *      prepares swap parameters, and executes the swap transaction.
 * @param swapAmount The amount of WETH to swap, specified as a number.
 * @returns {Promise<void>} A promise that resolves when the swap is complete.
 * @throws Logs an error message if any step in the swap process fails.
 */
async function main(swapAmount: number) {
  const inputAmount = swapAmount;
  const amountIn = ethers.parseUnits(inputAmount.toString(), 18);

  try {
    await approveToken(WETH.address, TOKEN_IN_ABI, amountIn, signer);
    const { poolContract, token0, token1, fee } = await getPoolInfo(
      factoryContract,
      WETH,
      USDC
    );
    console.log(`-------------------------------`);
    console.log(`Fetching Quote for: ${WETH.symbol} to ${USDC.symbol}`);
    console.log(`-------------------------------`);
    console.log(`Swap Amount: ${ethers.formatEther(amountIn)}`);

    const quotedAmountOut = await quoteAndLogSwap(
      quoterContract,
      fee,
      signer,
      amountIn
    );

    const params = await prepareSwapParams(
      poolContract,
      signer,
      amountIn,
      quotedAmountOut
    );
    const swapRouter = new ethers.Contract(
      SWAP_ROUTER_CONTRACT_ADDRESS,
      SWAP_ROUTER_ABI,
      signer
    );
    await executeSwap(swapRouter, params, signer);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
}

main(0.0001); // Change amount as needed
