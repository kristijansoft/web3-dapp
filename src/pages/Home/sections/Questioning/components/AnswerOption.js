import { useState } from "react";
import { ReactComponent as HexagonTickSvg } from "src/assets/img/icons/hexagon-tick.svg";
import { ReactComponent as HexagonSvg } from "src/assets/img/icons/hexagon.svg";
import { Ripple } from "src/components/lib";

export function AnswerOption({ selected, value, label, onSelected }) {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    onSelected(value);
  };

  return (
    <div
      className={`relative flex rounded-[8px] gap-[12px] items-center w-[335px] lg:w-[500px] px-[16px] py-[12px] border-[1px] cursor-pointer transition-all duration-300 overflow-hidden ${
        selected
          ? "border-yellow-light bg-grey-light text-white"
          : hover
          ? "border-yellow-light bg-yellow-lighter text-grey-black"
          : "border-grey-lighter2 text-grey-black"
      }`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <HexagonTickSvg
          className={`absolute top-0 left-0 transition-all duration-500 ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        />
        <HexagonSvg
          className={`transition-all duration-500 ${
            hover ? "stroke-yellow-dark" : "stroke-grey-lightest"
          }`}
        />
      </div>
      <p className={`font-body font-normal w-[420px] text-[18px] leading-[1]`}>
        {label}
      </p>
      <Ripple />
    </div>
  );
}
