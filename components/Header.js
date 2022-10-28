import styles from "./ManualHeader.module.css";
import { ConnectButton } from "@web3uikit/web3";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Automated raffle</h1>
      <ConnectButton moralisAuth={false} />
    </header>
  );
};

export default Header;
