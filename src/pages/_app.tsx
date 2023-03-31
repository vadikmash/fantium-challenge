import { type AppType } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Component {...pageProps} />
    </SkeletonTheme>
  );
};

export default api.withTRPC(MyApp);
