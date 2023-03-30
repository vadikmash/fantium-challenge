import { z } from "zod";
import { JsonRpcProvider, FetchRequest, AbiCoder, Interface } from "ethers";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const fetchRequest = new FetchRequest(
  "https://goerli.infura.io/v3/14ca1b80062340cf97e7d913506113ac"
);
fetchRequest.setHeader("origin", "https://goerli.etherscan.io");

const provider = new JsonRpcProvider(fetchRequest);

const abiInterface = new Interface(["function collections(uint256 id)"]);

interface Collection {
  exists: boolean;
  launchTimestamp: bigint;
  isMintable: boolean;
  isPaused: boolean;
  invocations: bigint;
  price: bigint;
  maxInvocations: bigint;
  tournamentEarningShare1e7: bigint;
  athleteAddress: string;
  athletePrimarySalesBPS: bigint;
  athleteSecondarySalesBPS: bigint;
  fantiumSalesAddress: string;
  fantiumSecondarySalesBPS: bigint;
}

export const collectionsRouter = createTRPCRouter({
  getCollection: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(({ input }) => {
      return Promise.all(
        input.ids.map(async (id) => {
          const encodedFunctionCall = abiInterface.encodeFunctionData(
            "collections",
            [id.toString()]
          );

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const response: string = await provider.send("eth_call", [
            {
              from: null,
              to: "0x4c61c07F1Ff7de15e40eFc1Bd3A94eEB54cBF242",
              data: encodedFunctionCall,
            },
            "latest",
          ]);

          const abiCoder = new AbiCoder();
          const decodedResponse = abiCoder
            .decode(
              [
                "bool exists",
                "uint256 launchTimestamp",
                "bool isMintable",
                "bool isPaused",
                "uint24 invocations",
                "uint256 price",
                "uint256 maxInvocations",
                "uint256 tournamentEarningShare1e7",
                "address athleteAddress",
                "uint256 athletePrimarySalesBPS",
                "uint256 athleteSecondarySalesBPS",
                "address fantiumSalesAddress",
                "uint256 fantiumSalesAddressBPS",
              ],
              response,
              true
            )
            .toObject() as Collection;

          return decodedResponse;
        })
      );
    }),
});
