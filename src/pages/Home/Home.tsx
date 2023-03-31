import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import BronzeImage from "./assets/bronze.png";
import SilverImage from "./assets/silver.png";
import GoldImage from "./assets/gold.png";
import RightArrow from "./assets/right-arrow.svg";
import { Card } from "../../components/Card";

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-main-background py-6 lg:p-2 2xl:p-4">
        <div>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-4 xl:gap-[39px]">
            <Card
              imageData={BronzeImage}
              category="bronze"
              features={[
                {
                  emoji: "💎",
                  content: "Access to FANtium Discord collectors channel",
                },
              ]}
              isLoading={collectionsQuery.isLoading}
              tournamentEarningShare1e7={bronzeCard?.tournamentEarningShare1e7}
              price={bronzeCard?.price}
              invocations={bronzeCard?.invocations}
              isMintable={bronzeCard?.isMintable}
            />
            <Card
              imageData={SilverImage}
              category="silver"
              features={[
                {
                  emoji: "💎",
                  content:
                    "Early access (allowlist) on the next Thiem NFT drop",
                },
                {
                  emoji: "👋",
                  content: "Exclusive workout video",
                },
              ]}
              isLoading={collectionsQuery.isLoading}
              tournamentEarningShare1e7={silverCard?.tournamentEarningShare1e7}
              price={silverCard?.price}
              invocations={silverCard?.invocations}
              isMintable={silverCard?.isMintable}
            />
            <Card
              imageData={GoldImage}
              category="gold"
              features={[
                {
                  emoji: "💎",
                  content: "Meet & greet at one tournament on the ATP tour",
                },
                {
                  emoji: "👋",
                  content: "Access to a private chat with the",
                },
              ]}
              isLoading={collectionsQuery.isLoading}
              tournamentEarningShare1e7={goldCard?.tournamentEarningShare1e7}
              price={goldCard?.price}
              invocations={goldCard?.invocations}
              isMintable={goldCard?.isMintable}
            />
          </div>
          <nav className="mt-[38px] flex justify-end">
            <a
              target="_blank"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="flex text-sm uppercase leading-[14px] tracking-[0.08rem] text-white"
            >
              Valuation method
              <RightArrow className="ml-[9px] mr-1" />
            </a>
          </nav>
        </div>
      </main>
    </>
  );
};

export default Home;
