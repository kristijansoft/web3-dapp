export function Tooltip({ children, className }) {
  return (
    <div
      className={`absolute animate-fadeIn z-[4] w-[178px] top-[15px] right-[-30px] p-[8px] pt-[4px] font-normal text-[12px] leading-[1.25] bg-white rounded-[4px] before:absolute before:bg-white before:top-[-5px] before:right-[30px] before:w-[10px] before:h-[10px] before:rotate-45 before:rounded-[2px] ${className}`}
      style={{
        boxShadow: "2px 29px 39px rgba(0, 0, 0, 0.23)",
        backdropFilter: "blur(7px)",
      }}
    >
      {children}
    </div>
  );
}
