import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketModule = buildModule("MarketModule7", (m) => {
  const market = m.contract("Market");

  return { market };
});

export default MarketModule;
