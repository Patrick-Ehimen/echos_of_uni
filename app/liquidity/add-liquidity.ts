const {
  encodeSqrtRatioX96,
  nearestUsableTick,
  NonfungiblePositionManager,
  Position,
  Pool,
} = require("@uniswap/v3-sdk");
const { ethers } = require("ethers");
const { ethers: hreEthers } = require("hardhat");
const { UNISWAP_FACTOR_ABI, UNISWAP_V3_POOL_ABI } = require("./abi.js");
const { Percent, Token } = require("@uniswap/sdk-core");
const ERC20_ABI = require("../artifacts/contracts/Token.sol/Token.json").abi;

async function main() {
  var token0Address = "0xA8397BA296D6629c97e7c1d67a03E2520FF04b4e";
  var token1Address = "0x85CafEfF4254900550386Ca575b2E417637d11EA";
  // (0.05, 0.3, 1, 0.01)
  var fee = 0.3 * 10000;
  var token0Decimals = 18;
  var token1Decimals = 18;
  // $2000 $1
  var price = encodePriceSqrt(1, 1);
  var npmca = "0x1238536071E1c677A632429e3655c799b22cDA52";
  var uniswapFactoryAddress = "0x0227628f3F023bb0B980b67D528571c95c6DaC1c";
  var amount0 = ethers.utils.parseUnits("10000", 18);
  var amount1 = ethers.utils.parseUnits("10000", 18);
  var chainID = 11155111;

  console.log("Started");
  const uniswapFactoryContract = await getContract(
    uniswapFactoryAddress,
    UNISWAP_FACTOR_ABI
  );
  const token0 = await getContract(token0Address, ERC20_ABI);
  const token1 = await getContract(token1Address, ERC20_ABI);

  await mintAndApprove(amount0, amount1, token0Address, token1Address, npmca);

  var poolAddress = await uniswapFactoryContract.getPool(
    token0Address,
    token1Address,
    fee
  );

  var deployer = await hreEthers.getSigner();
  if (poolAddress === "0x0000000000000000000000000000000000000000") {
    console.log("Creating pool");
    poolAddress = await createPool(
      uniswapFactoryContract,
      token0Address,
      token1Address,
      fee
    );

    await initializePool(poolAddress, price, deployer);
  }
  await addLiquidityToPool(
    poolAddress,
    deployer,
    chainID,
    token0Decimals,
    token1Decimals,
    token0,
    token1,
    amount0,
    amount1,
    fee,
    npmca
  );
  console.log("Added liquidity");

  console.log("Creating pool done");
}
