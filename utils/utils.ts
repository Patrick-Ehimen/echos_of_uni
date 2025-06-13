// Provider, Contract & Signer Instances
import { ethers } from "ethers";
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from "../config/tokens";
import FACTORY_ABI from "../abi/factory.json" assert { type: "json" };
import QUOTER_ABI from "../abi/quoter.json" assert { type: "json" };

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL_TESTNET);
const factoryContract = new ethers.Contract(
  POOL_FACTORY_CONTRACT_ADDRESS,
  FACTORY_ABI,
  provider
);
const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI,
  provider
);

if (!process.env.WALLET_SECRET_KEY) {
  throw new Error("WALLET_SECRET_KEY environment variable is not set");
}
const signer = new ethers.Wallet(process.env.WALLET_SECRET_KEY, provider);

export { provider, factoryContract, quoterContract, signer };
