import { ethers } from "ethers";
import { WETH, USDC } from "../../config/tokens";

/**
 * @notice Prepares the parameters required for a token swap operation.
 * @dev Fetches the pool fee and constructs the swap parameters object.
 * @param poolContract The ethers.Contract instance representing the pool.
 * @param signer The ethers.Wallet instance of the transaction signer.
 * @param amountIn The amount of input tokens to swap (in smallest units).
 * @param amountOut The minimum amount of output tokens expected (in smallest units).
 * @returns An object containing the swap parameters for the transaction.
 */
export async function prepareSwapParams(
  poolContract: ethers.Contract,
  signer: ethers.Wallet,
  amountIn: bigint,
  amountOut: bigint
) {
  return {
    tokenIn: WETH.address,
    tokenOut: USDC.address,
    fee: await poolContract.fee(),
    recipient: signer.address,
    amountIn: amountIn,
    amountOutMinimum: amountOut,
    sqrtPriceLimitX96: 0,
  };
}
