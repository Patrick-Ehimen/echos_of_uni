// Deployment Addresses (Sepolia)
export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0x0227628f3F023bb0B980b67D528571c95c6DaC1c";
export const QUOTER_CONTRACT_ADDRESS =
  "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3";
export const SWAP_ROUTER_CONTRACT_ADDRESS =
  "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";

// Token Configuration
export const WETH = {
  chainId: 11155111,
  address: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
  decimals: 18,
  symbol: "WETH",
  name: "Wrapped Ether",
  isToken: true,
  isNative: true,
  wrapped: true,
};

export const USDC = {
  chainId: 11155111,
  address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  decimals: 6,
  symbol: "USDC",
  name: "USD//C",
  isToken: true,
  isNative: true,
  wrapped: false,
};
