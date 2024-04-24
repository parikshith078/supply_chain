import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketModule = buildModule("MarketModule5", (m) => {
  const market = m.contract("Market");

  return { market };
});

export default MarketModule;
