import { ReactComponent as ExploreSvg } from "src/assets/img/icons/explore.svg";
import { ProgressBar2 } from "src/components/ProgressBar2";
import { Button } from "src/components/lib";
import { darkenColor } from "src/utils/helpers";
import { APY } from "./APY";
import { AssetBundle } from "./AssetBundle";
import { ChainLogo } from "./ChainLogo";
import { RiskLevel } from "./RiskLevel";

export function PoolBox({
  chain,
  protocol,
  share,
  risk,
  apy,
  pool,
  url,
  color,
  protocolImageId,
  assetImageIds,
  className,
}) {
  return (
    <div
      className={`border-[1px] border-grey-lightest rounded-[8px] bg-grey-lighter4 overflow-hidden ${className}`}
    >
      <div className="h-[35px] flex items-center px-[14px] gap-[8px]">
        <ChainLogo chain={chain} /> {chain}
      </div>
      <div
        className="rounded-[8px] bg-white px-[14px] pt-[8px] pb-[30px]"
        style={{
          boxShadow: "0px 0px 22px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex items-center">
          <img
            src={`/images/protocols/Logo-${protocolImageId}.png`}
            alt="Pool"
            className="w-[32px] h-[32px] rounded-full"
          />
          <p className="ml-[12px] text-grey-darkest font-bold text-[14px]">
            {protocol}
          </p>
          <div className="ml-auto">
            <p
              className="text-yellow-dark font-caption text-[18px]"
              style={{
                color: color === "#FFFFFF" ? "#E9BE5C" : darkenColor(color),
              }}
            >
              {share}%
            </p>
            <p className="mt-[3px] font-normal text-[12px] leading-[1.25]">
              of portfolio
            </p>
          </div>
        </div>
        <ProgressBar2 max={100} value={share} color={color} />
        <div className="flex items-center mt-[16px]">
          <AssetBundle imageIds={assetImageIds} />
          <p className="ml-[10px] font-normal text-[12px] leading-[1.25] text-grey-deep pr-[10px]">
            {pool}
          </p>
          <div className="ml-auto">
            <p className="text-[12px] leading-[1.33] text-grey-deep">Risk:</p>
            <RiskLevel value={risk} bordered className="mt-[4px]" />
          </div>
          <div className="ml-[8px]">
            <p className="text-[12px] leading-[1.33] text-grey-deep">APY:</p>
            <APY value={apy} className="mt-[4px]" />
          </div>
        </div>
      </div>
      <div className="py-[12.5px] border-t-[1px] border-grey-light38 hover:bg-yellow-lighter2">
        <Button type={8} link={url} isLink className="mx-auto">
          Explore Pool Page <ExploreSvg />
        </Button>
      </div>
    </div>
  );
}
