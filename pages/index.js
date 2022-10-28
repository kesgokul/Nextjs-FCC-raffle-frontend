import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import EnterRaffle from "../components/EnterRaffle";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FCC Raffe </title>
        <meta
          name="description"
          content="An automated and trustworthy raffle/lottery app powered by ethereum smart contracts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <EnterRaffle />
      </main>
    </div>
  );
}
