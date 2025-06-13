import { ethers } from "ethers";
import { WETH, USDC } from "../../config/tokens";

/**
 * @notice Quotes the output amount for a token swap and logs the result.
 * @dev Uses the provided quoter contract to simulate a swap from WETH to USDC, then logs the quoted output.
 * @param quoterContract The ethers.js Contract instance for the quoter.
 * @param fee The fee tier for the swap (in basis points, e.g., 500 for 0.05%).
 * @param signer The ethers.js Wallet instance representing the swap initiator.
 * @param amountIn The input amount of WETH to swap, as a bigint.
 * @returns The quoted output amount of USDC as a bigint.
 */
export async function quoteAndLogSwap(
  quoterContract: ethers.Contract,
  fee: number,
  signer: ethers.Wallet,
  amountIn: bigint
) {
  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    {
      tokenIn: WETH.address,
      tokenOut: USDC.address,
      fee: fee,
      recipient: signer.address,
      deadline: Math.floor(Date.now() / 1000 + 60 * 10),
      amountIn: amountIn,
      sqrtPriceLimitX96: 0,
    }
  );
  console.log(`-------------------------------`);
  console.log(
    `Token Swap will result in: ${ethers.formatUnits(
      quotedAmountOut[0].toString(),
      USDC.decimals
    )} ${USDC.symbol} for ${ethers.formatEther(amountIn)} ${WETH.symbol}`
  );
  return quotedAmountOut[0];
}
