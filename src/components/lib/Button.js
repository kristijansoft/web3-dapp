export function Button({
  type = 1,
  link = "",
  isLink = false,
  className,
  children,
  ...props
}) {
  return link || isLink ? (
    <a
      href={link ? link : "#"}
      target="_blank"
      rel="noreferrer"
      className={`rounded-[8px] flex justify-center items-center font-bold font-caption transition-all duration-300 ${styles[type]} ${className}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button
      className={`rounded-[8px] py-[16px] flex justify-center items-center font-bold font-caption transition-all duration-300 ${styles[type]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const styles = {
  // connect a wallet
  1: "h-[40px] w-[180px] text-white bg-grey-black hover:bg-grey-light",
  // connected wallet
  2: "h-[40px] w-[180px] font-[14px] leading-[1.1] rounded-[8px] gap-[8px] text-grey-black border-[1px] border-grey-lighter6 hover:bg-yellow-dark",
  // connect wallet & start, explore portfolio (large) button
  3: "h-[56px] w-[290px] gap-[10px] text-grey-dark border-2 border-yellow-light bg-yellow-dark hover:bg-yellow-deep disabled:hover:bg-yellow-dark",
  // view demo text button
  4: "text-yellow-main hover:text-yellow-deep min-w-[auto] py-0 font-medium text-[16px]",
  // disconnect button
  5: "w-full lg:w-[160px] text-red-light border-[2px] border-red-light hover:text-white hover:bg-red-light hover:border-red-dark",
  // share button
  6: "h-[40px] w-[166px] px-[25px] gap-[6px] bg-white border-[1px] border-blue-light text-blue-light fill-blue-light hover:bg-blue-dark hover:text-white hover:fill-white disabled:bg-blue-dark disabled:text-white disabled:fill-white",
  // invest with one click button
  7: "h-[44px] w-[287px] min-w-[287px] font-bold text-[16px] leading-[1.1] text-grey-dark border-2 border-yellow-light bg-yellow-dark hover:bg-yellow-deep",
  // explore pool page button
  8: "gap-[6px] bg-none border-none text-[14px] leading-[1.1] font-medium font-caption text-yellow-main hover:text-yellow-darkest stroke-yellow-main hover:stroke-yellow-darkest",
  // discord button
  9: "gap-[6px] px-[20px] py-[14px] bg-purple-light hover:bg-purple-dark text-white font-[16px] leading-[1.25] font-bold",
  // confirm button
  10: "h-[44px] w-full lg:w-[290px] border-[2px] bg-yellow-dark border-yellow-light hover:bg-yellow-deep disabled:bg-grey-deep disabled:border-grey-lightest text-grey-dark",
  // explore portfolio (small) button
  11: "h-[44px] w-[236px] border-[2px] border-yellow-light bg-yellow-dark hover:bg-yellow-deep text-[17.49px] leading-[1.1]",
  // invest button
  12: "w-[137px] h-[43px] bg-grey-black hover:bg-grey-light text-white font-bold rounded-[8px]",
  // arrow button
  13: "w-[32px] h-[32px] rounded-[5.33px] hover:bg-grey-black hover:fill-yellow-dark",
  // skip text button
  14: "!font-body font-normal text-grey-deep hover:text-yellow-dark min-w-[auto] text-[20px] leading-[1.1] !p-0",
  // customize button
  15: "h-[40px] lg:w-[166px] px-[25px] gap-[6px] bg-white border-[1px] border-yellow-dark text-yellow-dark fill-yellow-dark hover:bg-yellow-dark hover:text-white hover:fill-white disabled:bg-yellow-dark disabled:text-white disabled:fill-white",
};
