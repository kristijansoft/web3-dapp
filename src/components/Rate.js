import { ReactComponent as HexagonSvg } from "src/assets/img/icons/hexagon-large.svg";

export function Rate({ score, size = "large", className }) {
  return (
    <div
      className={`relative ${
        size === "large"
          ? "w-[124.6px] h-[114px] lg:w-[188px] lg:h-[172px]"
          : "w-[57.96px] h-[53px] lg:w-[79px] lg:h-[72px]"
      } ${className}`}
    >
      <HexagonSvg className="w-full h-full stroke-yellow-dark" />
      <div className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <p
          className={`font-caption font-medium ${
            size === "large"
              ? "text-[47.72px] lg:text-[72px]"
              : "text-[20.99px] lg:text-[28.5px]"
          } leading-[1.1] tracking-[-0.085em] text-yellow-dark`}
        >
          {score}
        </p>
        <p
          className={`${
            size === "large"
              ? "text-[15.91px] lg:text-[24px]"
              : "text-[7px] lg:text-[9.5px]"
          } leading-[1.2] tracking-[-0.5px]`}
        >
          of 10
        </p>
      </div>
    </div>
  );
}
