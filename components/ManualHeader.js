import styles from "./ManualHeader.module.css";

import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const ConnectButton = () => {
  const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3 } =
    useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Changed to: ${account}`);
      if (account === null) {
        localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  const connectHandler = () => {
    if (typeof window !== "undefined") {
      enableWeb3();
      window.localStorage.setItem("connected", "injected");
    }
  };

  return (
    <header className={styles.header}>
      <h1>Automated Raffle</h1>
      {!isWeb3Enabled && (
        <button onClick={connectHandler} className={styles["btn-connect"]}>
          Connect Wallet
        </button>
      )}
      {isWeb3Enabled && (
        <div>{`Connected to: ${account.slice(0, 6)}...${account.slice(
          account.length,
          -4
        )}`}</div>
      )}
    </header>
  );
};

export default ConnectButton;
