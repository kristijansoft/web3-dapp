import { ErrorBox } from "src/components/lib";
import { ProgressBar } from "src/components/ProgressBar";
import { useMediaQuery } from "src/utils/useMediaQuery";

export function Loading({
  title,
  description,
  progress,
  error,
  goToDemo,
  className,
}) {
  const isMobile = !useMediaQuery("(min-width: 1024px)");

  return (
    <div className="pt-[81px] px-[24px] lg:pt-[237px] animate-fadeIn">
      <div className={`text-center mx-auto ${className}`}>
        <h2
          className="text-[32px] lg:text-[44px] mx-auto"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="text-[16px] lg:text-[24px] leading-[1.2] font-body mt-[24px] mx-auto font-normal lg:font-light tracking-[-0.5px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <ProgressBar
          progress={progress}
          width={isMobile ? 327 : 500}
          height={50}
          iconWidth={42.85}
          className="mt-[48px] lg:mt-[36px] mx-auto"
        />
        {error && (
          <ErrorBox
            error={error}
            scanning
            reset={goToDemo}
            className="mt-[12px]"
          />
        )}
      </div>
    </div>
  );
}
