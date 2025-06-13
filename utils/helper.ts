import type { PoolImmutables, PoolContract, PoolState } from "../types/type";

exports.getPoolImmutables = async (
  poolContract: PoolContract
): Promise<PoolImmutables> => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables: PoolImmutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };
  return immutables;
};

exports.getPoolState = async (
  poolContract: PoolContract
): Promise<PoolState> => {
  const slot: [string, ...any[]] = await poolContract.slot0();

  const state: PoolState = {
    sqrtPriceX96: slot[0],
  };

  return state;
};
