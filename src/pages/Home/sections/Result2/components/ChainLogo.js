import { ReactComponent as ArbitrumLogoSvg } from "src/assets/img/icons/chain-logos/Arbitrum.svg";
import { ReactComponent as AvalancheLogoSvg } from "src/assets/img/icons/chain-logos/Avalanche.svg";
import { ReactComponent as BSCLogoSvg } from "src/assets/img/icons/chain-logos/BSC.svg";
import { ReactComponent as EthereumLogoSvg } from "src/assets/img/icons/chain-logos/Ethereum.svg";
import { ReactComponent as FantomLogoSvg } from "src/assets/img/icons/chain-logos/Fantom.svg";
import { ReactComponent as OptimismLogoSvg } from "src/assets/img/icons/chain-logos/Optimism.svg";
import { ReactComponent as PolygonLogoSvg } from "src/assets/img/icons/chain-logos/Polygon.svg";
import { ReactComponent as SolanaLogoSvg } from "src/assets/img/icons/chain-logos/Solana.svg";

export function ChainLogo({ chain, size = 16 }) {
  if (chain === "Ethereum") {
    return <EthereumLogoSvg width={size} height={size} />;
  }
  if (chain === "Optimism") {
    return <OptimismLogoSvg width={size} height={size} />;
  }
  if (chain === "Fantom") {
    return <FantomLogoSvg width={size} height={size} />;
  }
  if (chain === "BNB Chain") {
    return <BSCLogoSvg width={size} height={size} />;
  }
  if (chain === "Arbitrum") {
    return <ArbitrumLogoSvg width={size} height={size} />;
  }
  if (chain === "Avalanche") {
    return <AvalancheLogoSvg width={size} height={size} />;
  }
  if (chain === "Polygon") {
    return <PolygonLogoSvg width={size} height={size} />;
  }
  if (chain === "Solana") {
    return <SolanaLogoSvg width={size} height={size} />;
  }
  return null;
}
