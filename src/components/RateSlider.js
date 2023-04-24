import ReactSlider from "react-slider";
import { Tooltip } from "./Tooltip";

export function RateSlider({
  value = 5,
  onChange,
  showTooltip = false,
  disabled = false,
  className,
}) {
  const handleChange = (value) => {
    onChange(value / 2 + 1);
  };

  const renderThumb = ({ className, style, ...props }, state) => {
    return (
      <div
        {...props}
        className={`${className}`}
        style={{
          ...style,
          zIndex: "unset",
        }}
      >
        <div
          className={`relative w-[26px] h-[26px] -translate-x-1/2 translate-y-[-9px] rounded-full bg-yellow-dark cursor-pointer z-[4]`}
        ></div>
        <div className="absolute top-0 w-[38px] h-[38px] -translate-x-1/2 translate-y-[-15px] border-[2.45161px] border-yellow-dark rounded-full drop-shadow-sm backdrop-blur-sm opacity-40 z-[2]"></div>
        {showTooltip && <Tooltip>You can adjust your risk score here</Tooltip>}
      </div>
    );
  };

  const renderTrack = ({ className, style, ...props }, { index, value }) => {
    return index === 0 ? (
      <div
        className={`${className} h-[8px] rounded-full z-[3] after:hidden lg:after:block after:content-['LOW'] after:absolute after:left-[-45px] after:top-1/2 after:-translate-y-1/2 after:text-[14px] after:text-grey-lightest after:!font-normal`}
        style={{
          ...style,
          left: style.left - 13,
          width: style.width,
          boxShadow: "0px 0px 6px #E8B844",
          background: "#E9BE5C",
        }}
        {...props}
      />
    ) : (
      <div
        className={`${className} h-[8px] rounded-full z-[2] after:hidden lg:after:block after:content-['HIGH'] after:absolute after:right-[-47px] after:top-1/2 after:-translate-y-1/2 after:text-[14px] after:text-grey-lightest after:!font-normal`}
        style={{
          ...style,
          left: 0,
          width: "calc(100% + 13px)",
          background:
            "linear-gradient(97.67deg, #D6D6D6 3.48%, rgba(191, 191, 191, 0.19) 97.28%)",
          boxShadow:
            "inset 0px 0px 43.0664px rgba(255, 255, 255, 0.05), inset 0px 2.53332px 2.53332px rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8.23328px)",
        }}
      />
    );
  };

  const renderMarks = ({ key, style, ...props }) => {
    if (key !== 0 && key !== 18 && key !== (value - 1) * 2) return null;
    return (
      <div
        key={key}
        style={style}
        {...props}
        className={`relative ${
          key === (value - 1) * 2
            ? "top-[-29.65px] h-[12px]"
            : "top-[-22px] h-[22px]"
        } w-0 border-dotted border-grey-deep border-l-[1px]`}
      >
        {key === (value - 1) * 2 ? (
          <div className="absolute left-0 -translate-x-1/2 -translate-y-full top-[-4px] text-yellow-dark text-[24px] font-normal leading-[1.2] tracking-[-0.5px]">
            {value}
          </div>
        ) : (
          <div className="absolute left-0 -translate-x-1/2 -translate-y-full top-[-7px] font-medium text-grey-black">
            {key / 2 + 1}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      <ReactSlider
        renderThumb={renderThumb}
        renderTrack={renderTrack}
        renderMark={renderMarks}
        marks={1}
        min={0}
        max={18}
        step={1}
        value={(value - 1) * 2}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
}
