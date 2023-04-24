import { Web3ReactProvider } from "@web3-react/core";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import {
  metaMask,
  metaMaskHooks,
  trustWallet,
  trustWalletHooks,
  walletConnect,
  walletConnectHooks,
} from "./connectors";

import { DiscordProvider } from "./contexts/DiscordContext";
import { ModalProvider } from "./contexts/ModalContext";
import { WalletProvider } from "./contexts/WalletContext";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ToastProvider } from "./contexts/ToastContext";

const connectors = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [trustWallet, trustWalletHooks],
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider connectors={connectors}>
    <BrowserRouter>
      <WalletProvider>
        <DiscordProvider>
          <ModalProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ModalProvider>
        </DiscordProvider>
      </WalletProvider>
    </BrowserRouter>
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
