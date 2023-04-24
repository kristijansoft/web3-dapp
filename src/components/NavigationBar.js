import { Link } from "react-router-dom";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";

export function NavigationBar({ className }) {
  const { showModal } = useModal();

  const showRestartModal = () => showModal(ModalType.RestartModal);
  const showJoinModal = () => showModal(ModalType.JoinModal);

  return (
    <ul
      className={`flex gap-[42px] items-center justify-between lg:justify-start ${className}`}
    >
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-black hover:text-yellow-dark transition-all">
        <Link to="/" onClick={showRestartModal}>
          Home
        </Link>
      </li>
      <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-deep hover:text-yellow-dark transition-all">
        <Link
          to="/"
          className="flex items-center gap-[8px]"
          onClick={showJoinModal}
        >
          Airdrop
          <span className="mt-[3px] text-[6px] leading-[1.3] font-black uppercase text-yellow-darker border-[0.5px] border-yellow-darker w-[28px] h-[10px] flex justify-center items-center rounded-[2px]">
            soon
          </span>
        </Link>
      </li>
      {/* <li className="font-body text-[16px] leading-[1.1] font-medium text-grey-deep hover:text-yellow-dark transition-all">
        <Link
          to="/"
          className="flex items-center gap-[8px]"
          onClick={showJoinModal}
        >
          Dashboard
          <span className="mt-[1px] text-[6px] leading-[1.3] font-black uppercase text-yellow-darker border-[0.5px] border-yellow-darker w-[28px] h-[10px] flex justify-center items-center rounded-[2px]">
            soon
          </span>
        </Link>
      </li> */}
    </ul>
  );
}
