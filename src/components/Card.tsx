import { type FC } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardProps {
  imageSrc: string;
  category: "bronze" | "silver" | "gold";
  features: ReadonlyArray<{ emoji: string; content: string }>;
  isLoading: boolean;
  tournamentEarningShare1e7?: bigint;
  price?: bigint;
  invocations?: bigint;
  isMintable?: boolean;
}

const getSharePercentage = (share1e7: bigint) => {
  const precisionDigits = 5;
  const fractionDigits = precisionDigits - 1;
  const shareTenPower = 7n;

  // multiplying BigInt to the ten in power of precision digits before casting it to Number
  // to get a correct fraction value by dividing by ten in power of precision digits after casting
  const percent =
    Number((share1e7 * BigInt(10 ** precisionDigits)) / 10n ** shareTenPower) /
    10 ** precisionDigits;

  return `${percent.toFixed(fractionDigits)}%`;
};

const isSingular = (amount: string) => amount.at(-1) === "1" && amount !== "11";
const getInvocations = (invocations: bigint) => {
  const stringified = invocations.toLocaleString();
  return `${stringified} ${isSingular(stringified) ? "Token" : "Tokens"}`;
};

export const Card: FC<CardProps> = ({
  imageSrc,
  category,
  tournamentEarningShare1e7,
  features,
  price,
  invocations,
  isMintable,
  isLoading,
}) => {
  return (
    <div className="grid w-80 place-items-center transition-transform duration-100 hover:scale-[1.03]">
      <div className="bg-card-background pb-8 pt-2 shadow-card">
        <Image
          alt="Collection card image"
          src={imageSrc}
          loading="lazy"
          loader={({ src }) =>
            `https://storage.googleapis.com/fantium-image-storage/${src}`
          }
          width={304}
          height={427}
          className="mx-2 shadow-card"
        />
        <div className="mb-0.5 mt-8 px-8 text-xs capitalize leading-[18px] text-white">
          {category}
        </div>
        <div className="flex items-baseline justify-between border-b border-white border-opacity-10 pb-[18px] pl-8 pr-[29px]">
          <strong className="text-[28px] font-normal leading-[32px] text-white">
            {!isLoading ? (
              getSharePercentage(tournamentEarningShare1e7 ?? 0n)
            ) : (
              <Skeleton width={125} />
            )}
          </strong>
          <div className="translate-y-[6px] text-sm text-white text-opacity-50">
            Ownership / Token
          </div>
        </div>
        <div className="mt-[18px] px-[30px] text-sm font-bold leading-[17px] text-price-green">
          {!isLoading ? (
            `$ ${price?.toLocaleString() ?? ""}`
          ) : (
            <Skeleton width={70} />
          )}
        </div>
        <ul className="mt-[15px] h-[61px] pl-[60px] pr-[26px]">
          {features.map(({ emoji, content }, index) => (
            <li key={`${index}`} className="relative text-sm text-white">
              <div className="absolute -left-4 -top-[1px] -translate-x-full text-[9.5px]">
                {emoji}
              </div>
              {content}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={twMerge(
            `mx-8 mt-6 grid h-10 w-64 place-items-center rounded-[48px] bg-price-green text-xs font-bold uppercase leading-[15px]
            tracking-[0.02rem] text-button-text transition-transform duration-100 hover:brightness-90 active:scale-[0.98]`,
            isMintable &&
              "bg-white text-sm font-semibold leading-[14px] tracking-[0.08rem]"
          )}
          disabled={isLoading}
        >
          {!isLoading ? (
            <span>{isMintable ? "buy on open sea" : "button s"}</span>
          ) : (
            <span>Loading...</span>
          )}
        </button>
      </div>
      <span className="mt-[11px] text-sm text-white text-opacity-50">
        {!isLoading ? (
          getInvocations(invocations ?? 0n)
        ) : (
          <Skeleton width={100} />
        )}
      </span>
    </div>
  );
};
