import { ReactComponent as ConnectedSvg } from "src/assets/img/icons/connected.svg";
import { NavigationBar } from "src/components/NavigationBar";
import { Button, Logo } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useWallet } from "src/contexts/WalletContext";
import { formatAddress } from "src/utils/helpers";

export function Header() {
  const { walletAddress } = useWallet();
  const { showModal } = useModal();

  return (
    <div className="flex items-center px-[24px] lg:px-[64px] py-[12px] lg:py-[14px]">
      <Logo
        onClick={() => showModal(ModalType.RestartModal)}
        className="w-[45%] lg:w-auto"
      />
      <NavigationBar
        className="hidden ml-auto lg:flex"
        showStartAgainModal={() => showModal(ModalType.RestartModal)}
        showJoinModal={() => showModal(ModalType.JoinModal)}
      />
      {walletAddress ? (
        <Button
          type={2}
          className="ml-auto"
          onClick={() => showModal(ModalType.DisconnectModal)}
        >
          <ConnectedSvg />
          {formatAddress(walletAddress)}
        </Button>
      ) : (
        <Button
          type={1}
          className="ml-auto"
          onClick={() => showModal(ModalType.ConnectModal)}
        >
          Connect a wallet
        </Button>
      )}
    </div>
  );
}
