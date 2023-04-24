import { ReactComponent as CloseIcon } from "src/assets/img/icons/close.svg";
import { useModal } from "src/contexts/ModalContext";
import { Button } from "../lib";

export function ThanksModal() {
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full overflow-y-auto bg-grey-black43 animate-fadeIn">
      <div className="max-w-[327px] lg:max-w-[533px] bg-white pt-[20px] pb-[32px] px-[24px] lg:px-[32px] mt-[147px] mb-[100px] mx-auto rounded-[8px]">
        <div className="flex">
          <button
            onClick={closeModal}
            className="w-[12px] h-[12px] ml-auto mr-[6px] lg:mr-[16px] bg-none border-none"
          >
            <CloseIcon />
          </button>
        </div>
        <h3 className="hidden lg:block mt-[6px] text-[30px] lg:text-[32px] leading-[1.1] lg:w-[469px] text-center lg:text-left">
          You have successfully joined the waitlist
        </h3>
        <h3 className="lg:hidden mt-[6px] text-[30px] lg:text-[32px] leading-[1.1] lg:w-[469px] text-center lg:text-left">
          Thanks for the signup
        </h3>
        <p className="mt-[24px] lg:mt-[12px] text-[16px] lg:text-[18px] leading-[1.2] font-light tracking-[-0.5px] text-center lg:text-left">
          Stay tuned in our Discord for updates. To learn more about the
          mechanics of the waitlist, read{" "}
          <a
            href="https://onebuttontrader.medium.com/6dc5099b26c0"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-darker"
          >
            this article
          </a>
          .
          <br />
          <br />
        </p>
        <Button
          type={11}
          className="mt-[15px] mx-auto lg:mx-0"
          onClick={closeModal}
        >
          Back to Portfolio
        </Button>
      </div>
    </div>
  );
}
