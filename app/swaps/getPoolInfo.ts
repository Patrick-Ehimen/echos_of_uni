import { ethers } from "ethers";
import { WETH, USDC } from "../../config/tokens";
import POOL_ABI from "../../abi/pool.json" assert { type: "json" };
import { provider } from "../../utils/utils";

/**
 * @notice Retrieves information about a Uniswap V3 pool for a given token pair and fee tier.
 * @dev This function queries the factory contract for the pool address, then fetches token0, token1, and fee from the pool contract.
 * @param factoryContract The ethers.js Contract instance of the Uniswap V3 factory.
 * @param tokenIn The input token object (e.g., WETH) with an `address` property.
 * @param tokenOut The output token object (e.g., USDC) with an `address` property.
 * @return An object containing the pool contract instance, token0 address, token1 address, and fee tier.
 * @throws Error if the pool address cannot be found or is the zero address.
 */
export async function getPoolInfo(
  factoryContract: ethers.Contract,
  tokenIn: typeof WETH,
  tokenOut: typeof USDC
) {
  const poolAddress = await factoryContract.getPool(
    tokenIn.address,
    tokenOut.address,
    3000
  );
  if (!poolAddress || poolAddress === ethers.ZeroAddress) {
    throw new Error("Failed to get pool address");
  }
  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  return { poolContract, token0, token1, fee };
}
