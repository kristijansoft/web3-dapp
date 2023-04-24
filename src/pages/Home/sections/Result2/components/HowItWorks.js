import { ReactComponent as WarningHexagonSvg } from "src/assets/img/icons/warning-hexagon-outlined.svg";
import { Tooltip } from "src/components/Tooltip";

export function HowItWorks({ className }) {
  return (
    <div
      className={`relative inline-flex items-center gap-[7px] font-normal text-[14px] leading-[1.2] tracking-[-0.5px] text-yellow-dark ${className}`}
    >
      <WarningHexagonSvg />
      How it works?
      <Tooltip>Hello</Tooltip>
    </div>
  );
}
