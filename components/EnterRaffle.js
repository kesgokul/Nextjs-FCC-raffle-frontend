import styles from "./EnterRaffle.module.css";
import { abi, contractAddress } from "../constants/index.js";

import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

const EnterRaffle = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState(null);
  const { isWeb3Enabled, chainId: chainIdhex } = useMoralis();

  const chainId = parseInt(chainIdhex);

  const raffleAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  //   console.log(`ChainId: ${chainId} raffle: ${raffleAddress}`);

  const contractOptions = {
    abi: abi,
    contractAddress: raffleAddress,
    params: {},
  };

  // enterRaffle function
  const {
    runContractFunction: enterRaffle,
    data: enterTxResponse,
    isLoading,
    isFetching,
    error: enterError,
  } = useWeb3Contract({
    ...contractOptions,
    functionName: "enterRaffle",
    msgValue: entranceFee,
  });

  /* View functions  */
  // getEntranceFee function from Raffle contract
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    ...contractOptions,
    functionName: "getEntranceFee",
  });

  const { runContractFunction: getNumPlayers } = useWeb3Contract({
    ...contractOptions,
    functionName: "getNumPlayers",
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    ...contractOptions,
    functionName: "getRecentWinner",
  });

  const updateUI = async () => {
    const entranceFeeReceipt = await getEntranceFee();
    const numPlayersReceipt = await getNumPlayers();
    const recentWinnerReceipt = await getRecentWinner();

    setEntranceFee(entranceFeeReceipt);
    setNumPlayers(numPlayersReceipt);
    setRecentWinner(recentWinnerReceipt);
  };

  //handlers
  const enterRaffleHandler = async () => {
    await enterRaffle({
      onSuccess: async (tx) => {
        await tx.wait(1);
        updateUI();
      },
    });
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div className={styles["raffle-entrance"]}>
      <div className={styles["enter-raffle"]}>
        <p>
          {isWeb3Enabled &&
            `Raffle entrance fee: ${ethers.utils.formatUnits(
              entranceFee,
              "ether"
            )} ETH`}
        </p>
        <button
          onClick={enterRaffleHandler}
          className={styles["btn-enter-raffle"]}
          disabled={isLoading || isFetching}
        >
          {isLoading || isFetching ? "Loading..." : "Enter Raffle"}
        </button>
      </div>
      <p>{`Number of players entered: ${numPlayers}`}</p>
      <p>{recentWinner && `The most recent winner: ${recentWinner}`}</p>
    </div>
  );
};

export default EnterRaffle;
