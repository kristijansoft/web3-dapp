export function Link({ children, className, href, target = "_blank" }) {
  return (
    <a
      href={href}
      target={target}
      className={`text-grey-lighter hover:text-grey-black text-[12px] leading-[1.25] font-body font-normal underline transition-all ${className}`}
    >
      {children}
    </a>
  );
}
