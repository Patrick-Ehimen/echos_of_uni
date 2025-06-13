export interface PoolImmutables {
  token0: string;
  token1: string;
  fee: number;
}

export interface PoolContract {
  token0(): Promise<string>;
  token1(): Promise<string>;
  fee(): Promise<number>;
  slot0(): Promise<[string, ...any[]]>;
}

export interface PoolState {
  sqrtPriceX96: string;
}

export interface ExactInputSingleParams {
  tokenIn: string;
  tokenOut: string;
  fee: number;
  recipient: string;
  deadline: number;
  amountIn: bigint;
  amountOutMinimum: number;
  sqrtPriceLimitX96: number;
}
