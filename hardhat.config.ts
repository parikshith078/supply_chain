import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.SEED_KEY,
      },
      chainId: 1337,
    },
  },
};

export default config;
