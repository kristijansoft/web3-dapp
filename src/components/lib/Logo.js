import { ReactComponent as LogoSvg } from "src/assets/img/logo.svg";

export function Logo({ className, ...props }) {
  return <LogoSvg className={`cursor-pointer ${className}`} {...props} />;
}
