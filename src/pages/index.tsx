import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const bronzeCardId = 4;
const silverCardId = 5;
const goldCardId = 6;

const Home: NextPage = () => {
  const collectionsQuery = api.collections.getCollection.useQuery({
    ids: [bronzeCardId, silverCardId, goldCardId],
  });
  const [bronzeCard, silverCard, goldCard] = collectionsQuery.data ?? [];

  return (
    <>
      <Head>
        <title>Fantium Coding Challenge</title>
        <meta
          name="description"
          content="Fantium Coding Challenge for Full Stack Engineers"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Home;
