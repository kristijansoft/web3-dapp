import { useEffect } from "react";
import { ReactComponent as ConnectSvg } from "src/assets/img/icons/connect.svg";
import { ReactComponent as TimerSvg } from "src/assets/img/icons/timer.svg";
import { WalletInput } from "src/components/WalletInput";
import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";

export function Introduction({ className }) {
  const { setWalletAddress } = useWallet();
  const { showModal } = useModal();
  const { closeToast } = useToast();

  const showConnectModal = () => showModal(ModalType.ConnectModal);
  const showSkipModal = () => showModal(ModalType.SkipModal);

  // const isMobile = !useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    return closeToast;
  }, [closeToast]);

  return (
    <div className="pt-[81px] lg:pt-[100px] animate-fadeIn">
      <div
        className={`text-center w-full lg:w-[748px] px-[24px] lg:px-0 mx-auto ${className}`}
      >
        <h2 className="text-[32px] lg:text-[44px]">
          Generate your personalized DeFi portfolio
        </h2>
        <p className="text-[16px] lg:text-[24px] font-normal lg:font-light leading-[1.2] mt-[24px]">
          Our AI will analyze your on-chain history and make a personalized
          recommendation based on your profile
        </p>
        <Button
          type={3}
          className="mx-auto mt-[24px] lg:mt-[56px]"
          onClick={showConnectModal}
        >
          <ConnectSvg />
          Connect Wallet & Start
        </Button>
        <div className="relative max-w-[458px] h-[1px] mx-auto bg-grey-lightest-40 mt-[32.5px] after:content-['OR'] after:absolute after:text-grey-dark after:bg-white after:left-[50%] after:px-[21px] after:-translate-x-1/2 after:-translate-y-1/2 after:text-[14px] after:leading-[1.2] after:tracking-[-0.5px]"></div>
        <WalletInput
          className="mx-auto mt-[23.5px] lg:mt-[31.5px]"
          onSubmit={setWalletAddress}
        />
        <div className="flex items-center justify-center gap-[8px] mt-[16px] lg:mt-[24px]">
          <p className="text-[16px] leading-[1.39] font-normal">
            Don't have a wallet?
          </p>
          <Button type={4} onClick={showSkipModal}>
            View Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-[4px] text-[12px] font-normal leading-[1.25] mt-[39.5px]">
          <TimerSvg />
          Takes less than 2 minutes
        </div>
      </div>
    </div>
  );
}
