import type { NextPage } from "next";
import Head from "next/head";
import Counter from "../components/counter/Counter";

const IndexPage: NextPage = () => {
  return (
    <div className="text-center">
      <Head>
        <title>Dacheng</title>
      </Head>
      <p>home</p>
    </div>
  );
};

export default IndexPage;
