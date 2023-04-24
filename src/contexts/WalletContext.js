import { useWeb3React } from "@web3-react/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { metaMask, trustWallet, walletConnect } from "src/connectors";
import { WalletType } from "../constants/enums";

const WalletContext = createContext();
WalletContext.displayName = "Wallet Context";

function WalletProvider({ children }) {
  const [walletType, setWalletType] = useState(WalletType.None);
  const [walletAddress, setWalletAddress] = useState("");

  const { account, isActive } = useWeb3React();

  const connect = useCallback((walletType) => {
    if (walletType === WalletType.Metamask) {
      metaMask
        .activate()
        .catch((e) => console.log(`Error connecting with Metamask: ${e}`));
    }
    if (walletType === WalletType.WalletConnect) {
      walletConnect
        .activate()
        .catch((e) =>
          console.log(`Error connecting with Wallet Connect: ${e}`)
        );
    }
    if (walletType === WalletType.TrustWallet) {
      trustWallet
        .activate()
        .catch((e) => console.log(`Error connecting with Trust Wallet: ${e}`));
    }
    setWalletType(walletType);
  }, []);

  const disconnect = useCallback(() => {
    if (walletType === WalletType.None) setWalletAddress("");
    if (walletType === WalletType.Metamask) {
      metaMask.resetState();
    } else if (walletType === WalletType.WalletConnect) {
      walletConnect.resetState();
    } else if (walletType === WalletType.TrustWallet) {
      trustWallet.resetState();
    }
    setWalletType(WalletType.None);
  }, [walletType]);

  useEffect(() => {
    setWalletAddress(account);
  }, [account]);

  const value = useMemo(
    () => ({
      walletType,
      walletAddress,
      isActive,
      setWalletAddress,
      connect,
      disconnect,
    }),
    [walletType, walletAddress, isActive, connect, disconnect]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

const useWallet = () => {
  const value = useContext(WalletContext);
  if (!value)
    throw new Error("useWallet hook must be used within WalletProvider");
  return value;
};

export { useWallet, WalletProvider };

